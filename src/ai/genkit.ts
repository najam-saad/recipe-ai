import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [googleAI()],
  // Use gemini-1.5-flash-latest as the default model for general text and multimodal tasks.
  // Image generation will use specific models as defined in the flows.
  model: 'googleai/gemini-1.5-flash-latest',
});

