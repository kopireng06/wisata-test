import { useQuery } from '@tanstack/react-query'
import { openAiPrompt } from '../../fetchers/openAi'

const USE_OPENAI_PROMPT_KEY = 'open_ai_prompt'

const useOpenAiPrompt = ({ message, args, options }) =>
  useQuery({
    queryKey: [USE_OPENAI_PROMPT_KEY, message, args],
    queryFn: () => openAiPrompt(message, args),
    enabled: !!message,
    ...options
  })

export { USE_OPENAI_PROMPT_KEY, useOpenAiPrompt }
