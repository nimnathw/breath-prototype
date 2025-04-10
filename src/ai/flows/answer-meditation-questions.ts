// This file implements the Genkit flow for answering meditation questions based on a Q&A dataset.
// It exports the answerMeditationQuestions function, AnswerMeditationQuestionsInput interface, and AnswerMeditationQuestionsOutput interface.

'use server';

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnswerMeditationQuestionsInputSchema = z.object({
  question: z.string().describe('The question about meditation.'),
});
export type AnswerMeditationQuestionsInput = z.infer<typeof AnswerMeditationQuestionsInputSchema>;

const AnswerMeditationQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about meditation.'),
});
export type AnswerMeditationQuestionsOutput = z.infer<typeof AnswerMeditationQuestionsOutputSchema>;

export async function answerMeditationQuestions(input: AnswerMeditationQuestionsInput): Promise<AnswerMeditationQuestionsOutput> {
  return answerMeditationQuestionsFlow(input);
}

const answerMeditationQuestionsPrompt = ai.definePrompt({
  name: 'answerMeditationQuestionsPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The question about meditation.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the question about meditation.'),
    }),
  },
  prompt: `You are a meditation expert. Answer the following question about meditation:

Question: {{{question}}}

Answer: `,
});

const answerMeditationQuestionsFlow = ai.defineFlow<
  typeof AnswerMeditationQuestionsInputSchema,
  typeof AnswerMeditationQuestionsOutputSchema
>({
  name: 'answerMeditationQuestionsFlow',
  inputSchema: AnswerMeditationQuestionsInputSchema,
  outputSchema: AnswerMeditationQuestionsOutputSchema,
},
async input => {
  const {output} = await answerMeditationQuestionsPrompt(input);
  return output!;
});
