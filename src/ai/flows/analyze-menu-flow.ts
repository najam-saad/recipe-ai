'use server';
/**
 * @fileOverview AI agent that analyzes a restaurant menu image based on user queries,
 * providing details about dishes, including estimated nutritional information if requested
 * and not available on the menu.
 *
 * - analyzeMenu - A function that handles the menu analysis process.
 * - MenuAnalysisInput - The input type for the analyzeMenu function.
 * - MenuAnalysisOutput - The return type for the analyzeMenu function.
 */

import {ai} from '@/ai/genkit';
import {z}from 'genkit';
import type { MenuAnalysisInput, MenuAnalysisOutput, AnalyzedMenuItem } from '@/types'; 

const NutritionalInfoSchema = z.object({
  calories: z.string().optional().describe('Estimated calories per serving (e.g., "300-400 kcal").'),
  protein: z.string().optional().describe('Estimated protein in grams (e.g., "15g").'),
  carbohydrates: z.string().optional().describe('Estimated carbohydrates in grams (e.g., "40g").'),
  fats: z.string().optional().describe('Estimated fats in grams (e.g., "20g").'),
  isVegan: z.enum(['Yes', 'No', 'Likely Yes', 'Likely No', 'Unknown']).optional().describe('Whether the dish is vegan.'),
  isGlutenFree: z.enum(['Yes', 'No', 'Likely Yes', 'Likely No', 'Unknown']).optional().describe('Whether the dish is gluten-free.'),
  isLactoseFree: z.enum(['Yes', 'No', 'Likely Yes', 'Likely No', 'Unknown']).optional().describe('Whether the dish is lactose-free.'),
  commonAllergens: z.array(z.string()).optional().describe('List of common allergens potentially present (e.g., "nuts", "soy", "dairy").')
}).optional().describe("Nutritional information and dietary properties. If not on the menu, this can be an estimate based on general knowledge, clearly stated as such in the 'details' field.");


const AnalyzedMenuItemSchema = z.object({
  dishName: z.string().describe('The name of the menu item. This should be the full name as it appears on the menu, e.g., "Fried Yam, Plantain &".'),
  description: z.string().optional().describe('A brief description of the dish if available on the menu, separate from the name.'),
  isMatch: z.boolean().optional().describe('True if this item specifically matches the user\'s filter query (e.g., vegetarian, gluten-free). False or omit if not a filter query or no match.'),
  details: z.string().optional().describe('Additional details about the dish, especially if the user asked for specifics. If information (like ingredients or nutrition) is not on the menu, state that here. If nutritional info is estimated, this field should summarize that and mention it is an estimate.'),
  price: z.string().optional().describe('Price of the dish if clearly visible and extractable.'),
  nutritionalInfo: NutritionalInfoSchema,
});

const MenuAnalysisInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a restaurant menu, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  userQuery: z.string().describe('The user\'s specific question or preference regarding the menu (e.g., "Which dishes are gluten-free?", "Tell me about the lasagna", "What are the cheapest appetizers?", "Nutritional info for Fried Yam?", "Calories in Fried Yam?").'),
});

const MenuAnalysisOutputSchema = z.object({
  extractedText: z.string().optional().describe('The raw text extracted from the menu image. Useful for debugging or if AI cannot fully parse.'),
  analyzedItems: z.array(AnalyzedMenuItemSchema).describe('A list of menu items relevant to the user query, or all items if the query is general. If filtering, only matching items should have isMatch=true. If querying a specific dish, that dish should have its details field populated, and nutritionalInfo if applicable.'),
  summary: z.string().optional().describe('A general summary or answer to the user\'s query. If a specific dish was queried for nutrition, this summary might point to the details and estimates in analyzedItems.'),
});


export async function analyzeMenu(
  input: MenuAnalysisInput
): Promise<MenuAnalysisOutput> {
  return analyzeMenuFlow(input);
}

const menuAnalysisPrompt = ai.definePrompt({
  name: 'menuAnalysisPrompt',
  input: {schema: MenuAnalysisInputSchema},
  output: {schema: MenuAnalysisOutputSchema},
  prompt: `You are a helpful assistant designed to analyze restaurant menus from images and provide nutritional estimates if requested.
Your goal is to extract information from the menu image and answer the user's query.

User's Query: "{{{userQuery}}}"

Menu Image: {{media url=photoDataUri}}

Instructions:
1.  First, try to OCR the entire menu image and store it in 'extractedText'. This is for context and fallback.
2.  Parse the menu image (using the 'extractedText' or directly from the image) to identify all distinct dishes. For each dish, attempt to extract its name, description (if any), and price (if visible).
3.  Based on the user's query ("{{{userQuery}}}"), process the identified dishes:
    a. Populate the 'analyzedItems' array. Each object in this array MUST represent a distinct dish found on the menu.
    b. For each dish in 'analyzedItems':
        *   'dishName': The full name of the dish as it appears on the menu (e.g., "Fried yam, plantain &").
        *   'description': Any supplementary descriptive text for that dish on the menu.
        *   'price': The price, if clearly visible.
        *   'isMatch': If the user query is a filter (e.g., "vegetarian"), set to 'true' if this dish matches, 'false' otherwise.
        *   'details': This field is for textual explanations.
        *   'nutritionalInfo': This object is for structured nutritional data.

    c. If the 'userQuery' asks for nutritional information (calories, protein, fat, carbs, vegan, gluten-free, lactose-free, allergens) about a *specific dish*:
        1.  Identify the item in 'analyzedItems' that corresponds to this queried dish.
        2.  Check if this information is explicitly on the menu for this dish.
            *   If YES: Extract it directly, populate the relevant fields in the 'nutritionalInfo' object for that item, and summarize this in the 'details' field (e.g., "As per the menu, [Dish Name] has X calories...").
            *   If NO (information is NOT on the menu):
                i.  Use your general knowledge of food and cooking to provide estimates for the \`nutritionalInfo\` object fields: 'calories', 'protein', 'carbohydrates', 'fats', 'isVegan', 'isGlutenFree', 'isLactoseFree', and 'commonAllergens'.
                ii. The 'details' field for THIS SPECIFIC ITEM MUST contain a clear textual summary of these estimates, EXPLICITLY STATING that this information is an estimate because it's not on the menu. For example: "Nutritional information for [Dish Name] is not provided on the menu. An estimate based on typical recipes is: Calories: [estimated_calories], Protein: [estimated_protein]g, Carbs: [estimated_carbs]g, Fats: [estimated_fats]g. Vegan: [estimated_vegan_status]. Gluten-Free: [estimated_gluten_status]. Lactose-Free: [estimated_lactose_status]. Common Allergens: [list_of_allergens]. *Please note these are estimates.*"
                iii. If you cannot confidently estimate for a very obscure or uniquely named dish where typical recipes are unknown, state this in the 'details' field (e.g., "Cannot estimate nutritional information for [Dish Name] as it's not on the menu and the dish is too unique for a reliable estimate.") and leave the 'nutritionalInfo' object empty or with 'Unknown' values where appropriate.

    d. If the 'userQuery' asks about ingredients of a specific dish (and NOT primarily nutritional breakdown), and ingredients are not on the menu:
        *   The 'details' field for that item should state: "Based on common ingredients for [Dish Name], it likely contains... The menu does not list specific ingredients for this item." Leave 'nutritionalInfo' empty unless nutrition was also part of the query.

    e. If the 'userQuery' asks about a specific dish name that you CANNOT find on the menu, the 'analyzedItems' array might be empty or list other dishes, and the 'summary' should clearly state that the queried dish was not found.

4.  Construct a 'summary' response:
    *   If the 'userQuery' was about a SPECIFIC dish's nutrition, the summary should be concise, e.g., "I've looked into '[Dish Name]' for you. Since the menu doesn't list nutritional details, I've provided an estimate below. Please see its details in the item list." The primary detailed answer and estimates MUST be in that item's 'details' and 'nutritionalInfo' fields.
    *   If the 'userQuery' was a general filter (e.g., "vegetarian options"), the summary should state the findings, e.g., "The menu lists X vegetarian options, highlighted below."
    *   If the query is very general (e.g., "What's on the menu?"), the summary can be brief: "Here are the dishes I identified:".

5.  If the menu image is very unclear or the query cannot be definitively answered even after attempting to parse items:
    *   If the query was about a specific dish, reflect this difficulty in that dish's 'details' field (e.g., "The menu image is too blurry to determine details for [Dish Name].")
    *   The 'summary' should also explain the general difficulty.
    *   Still, ALWAYS attempt to populate 'analyzedItems' with any dishes you could partially identify.

6.  Prioritize accuracy. If unsure about a detail from the menu, state it. If providing estimates for nutrition, clearly label them as estimates in the 'details' field of the specific item.

7.  Crucially, for a specific dish query, ensure its corresponding 'details' field and, if applicable, 'nutritionalInfo' object in 'analyzedItems' are populated with the specific answer, estimation, or explanation.

Output the response in JSON format according to the defined schema.
The 'analyzedItems' array, especially the 'details' and 'nutritionalInfo' fields for specifically queried items, should be your primary focus for providing detailed answers and estimates.
`,
});

const analyzeMenuFlow = ai.defineFlow(
  {
    name: 'analyzeMenuFlow',
    inputSchema: MenuAnalysisInputSchema,
    outputSchema: MenuAnalysisOutputSchema,
  },
  async (input: MenuAnalysisInput): Promise<MenuAnalysisOutput> => {
    const {output} = await menuAnalysisPrompt(input);

    if (!output) {
      throw new Error('Failed to get a valid analysis from the model.');
    }
    
    const processedItems = (output.analyzedItems || []).map(item => ({
      ...item,
      // Ensure nutritionalInfo is an object if it's meant to be, or undefined.
      nutritionalInfo: item.nutritionalInfo && Object.keys(item.nutritionalInfo).length > 0 ? item.nutritionalInfo : undefined,
    }));

    return {
      ...output,
      analyzedItems: processedItems, 
    };
  }
);

