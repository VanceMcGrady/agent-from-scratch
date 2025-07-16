import 'dotenv/config'
import { runLLM } from './src/llm'
const userMessage = process.argv[2]
import { addMessages, getMessages } from './src/memory'

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

await addMessages([{ role: 'user', content: userMessage }])
const messages = await getMessages()

const response = await runLLM({
  messages: [...messages, { role: 'user', content: userMessage }],
})

await addMessages([{ role: 'assistant', content: response }])
console.log(response)
