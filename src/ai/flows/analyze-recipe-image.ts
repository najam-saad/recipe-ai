// 'use server';

/**
 * @fileOverview Analyzes an image of a dish to identify it, suggest potential recipes or ingredients,
 * and provide an estimated nutritional breakdown.
 *
 * - analyzeRecipeImage - A function that handles the image analysis process.
 * - AnalyzeRecipeImageInput - The input type for the analyzeRecipeImage function.
 * - AnalyzeRecipeImageOutput - The return type for the analyzeRecipeImage function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeRecipeImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a dish, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeRecipeImageInput = z.infer<typeof AnalyzeRecipeImageInputSchema>;

const AnalyzeRecipeImageOutputSchema = z.object({
  dishName: z.string().optional().describe('The identified name of the dish in the image.'),
  suggestedRecipes: z
    .array(z.string())
    .optional()
    .describe('A list of suggested recipes based on the image or identified dish.'),
  suggestedIngredients: z
    .array(z.string())
    .optional()
    .describe('A list of suggested ingredients based on the image or identified dish.'),
  calories: z.string().optional().describe('Estimated calories per serving (e.g., "350-450 kcal").'),
  protein: z.string().optional().describe('Estimated protein content per serving (e.g., "20-25g").'),
  vitamins: z.array(z.string()).optional().describe('List of key vitamins present (e.g., ["Vitamin C", "Iron"]).'),
  servingSize: z.string().optional().describe('Estimated or typical serving size (e.g., "1 bowl", "200g").')
});
export type AnalyzeRecipeImageOutput = z.infer<typeof AnalyzeRecipeImageOutputSchema>;

export async function analyzeRecipeImage(input: AnalyzeRecipeImageInput): Promise<AnalyzeRecipeImageOutput> {
  return analyzeRecipeImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeRecipeImagePrompt',
  input: {schema: AnalyzeRecipeImageInputSchema},
  output: {schema: AnalyzeRecipeImageOutputSchema},
  prompt: `You are an expert nutritionist and chef. Analyze the provided image of a dish.

Your tasks are to:
1.  Identify the name of the dish in the image.
2.  Provide an estimated nutritional breakdown for a typical serving of this dish. Include:
    *   Estimated calories (e.g., "350-450 kcal").
    *   Estimated protein content (e.g., "20-25g").
    *   A list of 2-3 key vitamins likely present (e.g., ["Vitamin C", "Iron"]).
    *   A typical serving size (e.g., "1 bowl (approx 300g)", "1 slice").
3.  Optionally, suggest 1-2 potential full recipes if the dish is a component or could be part of one.
4.  Optionally, list 3-5 key ingredients commonly found in this dish.

Image: {{media url=photoDataUri}}

Provide the output in JSON format according to the defined schema. Be concise and focus on the most relevant information. If you cannot identify the dish or provide certain nutritional information, you may omit those fields or provide a reasonable estimate with a note of uncertainty if appropriate (though the schema prefers direct values or omissions).`,
});

const analyzeRecipeImageFlow = ai.defineFlow(
  {
    name: 'analyzeRecipeImageFlow',
    inputSchema: AnalyzeRecipeImageInputSchema,
    outputSchema: AnalyzeRecipeImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Failed to get a valid analysis from the model.");
    }
    return output;
  }
);
