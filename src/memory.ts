import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type MessageWithMetaDAta = AIMessage & { id: string; createdAt: string }

export const addMetadata = (message: AIMessage): MessageWithMetaDAta => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
})

export const removeMetadata = (message: MessageWithMetaDAta): AIMessage => {
  const { id, createdAt, ...messageWithoutMetadata } = message
  return messageWithoutMetadata
}

type Data = {
  messages: MessageWithMetaDAta[]
}

const defaultData: Data = { messages: [] }

export const getDb = async () => {
  const db = await JSONFilePreset<Data>('db.json', defaultData)

  return db
}

export const addMessages = async (message: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...message.map(addMetadata))
  await db.write()
}

export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetadata)
}
