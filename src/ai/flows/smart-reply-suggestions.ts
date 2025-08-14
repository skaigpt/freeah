'use server';

/**
 * @fileOverview Provides smart reply suggestions based on the current conversation context.
 *
 * - getSmartReplySuggestions - A function that generates smart reply suggestions.
 * - SmartReplySuggestionsInput - The input type for the getSmartReplySuggestions function.
 * - SmartReplySuggestionsOutput - The return type for the getSmartReplySuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SmartReplySuggestionsInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The recent conversation history to provide context for generating smart reply suggestions.'),
});

export type SmartReplySuggestionsInput = z.infer<typeof SmartReplySuggestionsInputSchema>;

const SmartReplySuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('An array of smart reply suggestions based on the conversation history.'),
});

export type SmartReplySuggestionsOutput = z.infer<typeof SmartReplySuggestionsOutputSchema>;

export async function getSmartReplySuggestions(input: SmartReplySuggestionsInput): Promise<SmartReplySuggestionsOutput> {
  return smartReplySuggestionsFlow(input);
}

const smartReplySuggestionsPrompt = ai.definePrompt({
  name: 'smartReplySuggestionsPrompt',
  input: {schema: SmartReplySuggestionsInputSchema},
  output: {schema: SmartReplySuggestionsOutputSchema},
  prompt: `Given the following conversation history, generate three smart reply suggestions that the user can quickly use to respond to the last message.

Conversation History:
{{conversationHistory}}

Suggestions:
1.`, // The LLM will generate the rest.
});

const smartReplySuggestionsFlow = ai.defineFlow(
  {
    name: 'smartReplySuggestionsFlow',
    inputSchema: SmartReplySuggestionsInputSchema,
    outputSchema: SmartReplySuggestionsOutputSchema,
  },
  async input => {
    const {output} = await smartReplySuggestionsPrompt(input);
    return output!;
  }
);
