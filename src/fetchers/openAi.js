import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
})

const openAiPrompt = async (message, openAiArgs = {}) => {
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You will be provided with unstructured data, and your task is to parse it into CSV format.'
      },
      {
        role: 'user',
        content: message
      }
    ],
    temperature: 0,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    ...openAiArgs
  })
}

export { openAiPrompt }
