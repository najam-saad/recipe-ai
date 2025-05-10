
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-recipe.ts';
import '@/ai/flows/analyze-recipe-image.ts';
import '@/ai/flows/generate-recipe-by-name.ts';
import '@/ai/flows/analyze-menu-flow.ts';
