'use server';
/**
 * @fileOverview AI agent that generates recipe ideas based on provided ingredients.
 *
 * - generateRecipeFromIngredients - A function that handles the recipe generation process.
 * - GenerateRecipeInput - The input type for the generateRecipeFromIngredients function.
 * - GenerateRecipeOutput - The return type for the generateRecipeFromIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients the user has on hand.'),
  cuisine: z.string().optional().describe('The preferred cuisine (e.g., Italian, Mexican).'),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe('Any dietary restrictions (e.g., vegetarian, gluten-free).'),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  ingredients: z.string().describe('A list of ingredients for the recipe.'),
  instructions: z.string().describe('Step-by-step instructions for preparing the recipe.'),
  image: z
    .string()
    .describe(
      'An image of the generated recipe, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    )
    .optional(), // Make image optional
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipeFromIngredients(
  input: GenerateRecipeInput
): Promise<GenerateRecipeOutput> {
  return generateRecipeFlow(input);
}

const recipePrompt = ai.definePrompt({
  name: 'recipePrompt',
  input: {schema: GenerateRecipeInputSchema},
  output: {schema: GenerateRecipeOutputSchema},
  prompt: `You are a recipe generation expert. Create a recipe based on the ingredients provided.

Ingredients on hand: {{{ingredients}}}

{{#if cuisine}}
Preferred cuisine: {{{cuisine}}}
{{/if}}

{{#if dietaryRestrictions}}
Dietary restrictions: {{{dietaryRestrictions}}}
{{/if}}

Ensure the recipe includes:
- A creative and appealing title.
- A detailed list of ingredients with quantities.
- Clear and concise step-by-step instructions.

Make sure that the image, if present, is a valid data URI.

Output the recipe in JSON format.`,
});

const generateRecipeFlow = ai.defineFlow(
  {
    name: 'generateRecipeFlow',
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async input => {
    const {output} = await recipePrompt(input);

    // Generate image in parallel with text generation
    let imageUri: string | undefined;
    if (output) {
      const imageResponse = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp',
        prompt: `Generate an image of ${output.title}`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });

      imageUri = imageResponse.media?.url;
    }

    return {
      ...output!,
      image: imageUri,
    };
  }
);
