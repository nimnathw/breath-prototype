// src/ai/flows/generate-faq-content.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating FAQ content related to meditation.
 *
 * generateFaqContent - A function that generates FAQ content based on a prompt.
 * GenerateFaqContentInput - The input type for the generateFaqContent function.
 * GenerateFaqContentOutput - The output type for the generateFaqContent function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateFaqContentInputSchema = z.object({
  topic: z.string().describe('The topic for the FAQ content.'),
  style: z.string().describe('The style of the FAQ content (e.g., professional, casual).').optional(),
});
export type GenerateFaqContentInput = z.infer<typeof GenerateFaqContentInputSchema>;

const GenerateFaqContentOutputSchema = z.object({
  faqContent: z.string().describe('The generated FAQ content.'),
});
export type GenerateFaqContentOutput = z.infer<typeof GenerateFaqContentOutputSchema>;

export async function generateFaqContent(input: GenerateFaqContentInput): Promise<GenerateFaqContentOutput> {
  return generateFaqContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateFaqContentPrompt',
  input: {
    schema: z.object({
      topic: z.string().describe('The topic for the FAQ content.'),
      style: z.string().describe('The style of the FAQ content (e.g., professional, casual).').optional(),
    }),
  },
  output: {
    schema: z.object({
      faqContent: z.string().describe('The generated FAQ content.'),
    }),
  },
  prompt: `You are an expert in creating FAQ content about meditation.

  Generate FAQ content for the following topic: {{{topic}}}.
  The style should be: {{{style}}}.

  The FAQ should be in markdown format with questions as headings and answers as paragraphs.
  `,
});

const generateFaqContentFlow = ai.defineFlow<
  typeof GenerateFaqContentInputSchema,
  typeof GenerateFaqContentOutputSchema
>({
  name: 'generateFaqContentFlow',
  inputSchema: GenerateFaqContentInputSchema,
  outputSchema: GenerateFaqContentOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
