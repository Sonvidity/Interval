'use server';
/**
 * @fileOverview An AI flow to suggest a social media post for a user's car.
 *
 * - suggestPost - A function that handles the post suggestion process.
 * - SuggestPostInput - The input type for the suggestPost function.
 * - SuggestPostOutput - The return type for the suggestPost function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SuggestPostInputSchema = z.object({
    make: z.string().describe("The make of the car (e.g., Toyota)"),
    model: z.string().describe("The model of the car (e.g., 86)"),
    variant: z.string().describe("The variant of the car (e.g., GTS)"),
    nickname: z.string().describe("The user's nickname for the car."),
    modStage: z.string().describe("The modification stage of the car (e.g., Stage 2)"),
});
export type SuggestPostInput = z.infer<typeof SuggestPostInputSchema>;

const SuggestPostOutputSchema = z.object({
  postText: z.string().describe('A creative and engaging social media post text, between 20 and 50 words. Include hashtags.'),
});
export type SuggestPostOutput = z.infer<typeof SuggestPostOutputSchema>;


export async function suggestPost(input: SuggestPostInput): Promise<SuggestPostOutput> {
  return suggestPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestPostPrompt',
  input: { schema: SuggestPostInputSchema },
  output: { schema: SuggestPostOutputSchema },
  prompt: `You are a social media manager for a car enthusiast community. A user wants to post about their car.
Generate a short, cool, and engaging social media post text for them.

The post should be between 20 and 50 words.
Make it sound authentic, like a real car owner would write it.
Include 2-3 relevant hashtags.

Car Details:
- Make: {{{make}}}
- Model: {{{model}}}
- Variant: {{{variant}}}
- Nickname: {{{nickname}}}
- Modifications: {{{modStage}}}
`,
});

const suggestPostFlow = ai.defineFlow(
  {
    name: 'suggestPostFlow',
    inputSchema: SuggestPostInputSchema,
    outputSchema: SuggestPostOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
