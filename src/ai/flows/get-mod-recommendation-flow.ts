
'use server';
/**
 * @fileOverview An AI agent for generating vehicle modification recommendations.
 *
 * - getModRecommendations - A function that handles the modification recommendation process.
 * - ModRecommendationsInput - The input type for the getModRecommendations function.
 * - ModRecommendations - The return type for the getModRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import type { ModStage } from '@/lib/types';

export const ModRecommendationsInputSchema = z.object({
  make: z.string().describe('The make of the vehicle (e.g., Toyota).'),
  model: z.string().describe('The model of the vehicle (e.g., 86).'),
  variant: z.string().describe('The specific variant of the vehicle (e.g., GTS, ZN6).'),
  year: z.string().describe('The manufacturing year or year range of the vehicle (e.g., 2017-2021).'),
  currentModStage: z.custom<ModStage>().describe('The current modification stage of the vehicle.'),
});
export type ModRecommendationsInput = z.infer<typeof ModRecommendationsInputSchema>;

export const ModRecommendationsSchema = z.object({
  stageTitle: z.string().describe("A descriptive title for the current modification stage, e.g., 'Stage 1: The Basics' or 'Stage 2: Bolt-Ons'."),
  stageSummary: z.string().describe("A brief, one or two sentence summary of the current modification stage and what it typically involves for this specific car."),
  nextMods: z.array(z.string()).describe("A list of 3-5 specific, actionable next modifications to progress to the next stage. Be specific, e.g., 'High-flow catalytic converter' instead of just 'exhaust'. Aim for a logical progression."),
  reliabilityConcerns: z.array(z.string()).describe("A list of 3-5 common issues, reliability concerns, or required supporting mods associated with the *next suggested mods*. For example, if suggesting a turbo upgrade, mention the need for a stronger clutch or better cooling."),
  engineLimits: z.string().describe("A realistic assessment of the stock engine's power/torque limits (e.g., in hp or kw) and what the typical failure point is (e.g., 'connecting rods', 'head gasket'). Be concise and direct."),
});
export type ModRecommendations = z.infer<typeof ModRecommendationsSchema>;


const recommendationPrompt = ai.definePrompt({
    name: 'modRecommendationPrompt',
    input: { schema: ModRecommendationsInputSchema },
    output: { schema: ModRecommendationsSchema },
    prompt: `You are an expert mechanic and tuner specializing in performance car modifications. Your task is to provide a clear, concise, and realistic modification guide for a specific vehicle.

The user's car is a {{year}} {{make}} {{model}} ({{variant}}).
Their current modification level is: {{currentModStage}}.

Based on this, generate a guide for the NEXT logical step in their modification journey.

- If the car is 'Stock', your guide should be for 'Stage 1'.
- If the car is 'Stage 1', your guide should be for 'Stage 2'.
- If the car is 'Stage 2', your guide should be for 'Stage 3'.
- If the car is 'Stage 3', your guide should be about pushing the limits with a built motor, custom fabrication, and advanced tuning.

Focus on providing actionable, specific advice. Avoid generic statements. Use industry-standard terminology. Be direct about risks and limits.`,
});


const getModRecommendationsFlow = ai.defineFlow(
  {
    name: 'getModRecommendationsFlow',
    inputSchema: ModRecommendationsInputSchema,
    outputSchema: ModRecommendationsSchema,
  },
  async (input) => {
    const { output } = await recommendationPrompt(input);
    return output!;
  }
);


export async function getModRecommendations(input: ModRecommendationsInput): Promise<ModRecommendations> {
  return getModRecommendationsFlow(input);
}
