
'use server';
/**
 * @fileOverview AI agent that generates a recipe based on a dish name.
 *
 * - generateRecipeByName - A function that handles the recipe generation process from a dish name.
 * - GenerateRecipeByNameInput - The input type for the generateRecipeByName function.
 * - GenerateRecipeByNameOutput - The return type for the generateRecipeByName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { recipeCategories, type RecipeCategory } from '@/types';

const GenerateRecipeByNameInputSchema = z.object({
  dishName: z.string().describe('The name of the dish to generate a recipe for.'),
});
export type GenerateRecipeByNameInput = z.infer<typeof GenerateRecipeByNameInputSchema>;

const GenerateRecipeByNameOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z.string().describe('A newline-separated list of ingredients for the recipe, including quantities.'),
  instructions: z.string().describe('Newline-separated step-by-step instructions for preparing the recipe.'),
  cuisine: z.string().optional().describe('The cuisine of the dish (e.g., Italian, Mexican).'),
  category: z.enum(recipeCategories).optional().describe(`The category of the dish. Choose one from: ${recipeCategories.join(', ')}`),
  image: z
    .string()
    .describe(
      "An image of the generated recipe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    )
    .optional(),
});
export type GenerateRecipeByNameOutput = z.infer<typeof GenerateRecipeByNameOutputSchema>;

export async function generateRecipeByName(
  input: GenerateRecipeByNameInput
): Promise<GenerateRecipeByNameOutput> {
  return generateRecipeByNameFlow(input);
}

const recipeByNamePrompt = ai.definePrompt({
  name: 'recipeByNamePrompt',
  input: {schema: GenerateRecipeByNameInputSchema},
  output: {schema: GenerateRecipeByNameOutputSchema.omit({ image: true })}, // Image is generated separately
  prompt: `You are an expert chef. Generate a detailed recipe for the dish named: {{{dishName}}}.

Your response should include:
- A creative and appealing title for the recipe.
- A detailed list of ingredients with quantities. Each ingredient should be on a new line.
- Clear and concise step-by-step instructions. Each step should be on a new line.
- The cuisine type of the dish (e.g., Italian, Mexican, Indian).
- The recipe category. Choose one from the following: ${recipeCategories.join(', ')}. If none fit perfectly, choose the closest one or 'Other'.

Output the recipe details (title, ingredients, instructions, cuisine, category) in JSON format.`,
});

const generateRecipeByNameFlow = ai.defineFlow(
  {
    name: 'generateRecipeByNameFlow',
    inputSchema: GenerateRecipeByNameInputSchema,
    outputSchema: GenerateRecipeByNameOutputSchema,
  },
  async input => {
    const {output: recipeDetails} = await recipeByNamePrompt(input);

    if (!recipeDetails) {
      throw new Error('Failed to generate recipe details from AI.');
    }

    let imageUri: string | undefined;
    // Generate image based on the recipe title
    const imageResponse = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp', // Specific model for image generation
      prompt: `Generate a realistic image of a freshly prepared dish: ${recipeDetails.title}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    imageUri = imageResponse.media?.url;

    return {
      ...recipeDetails,
      image: imageUri,
    };
  }
);
