
import { getLocalDocs, initVectorStore, chat } from './chat.mjs'

export const query = async (message) => {
  const docs = await getLocalDocs()

  const docList = docs.filter(doc => doc.metadata.source.indexOf('GDP') > -1)
  console.log('docs', docList)
  const vectorStore = await initVectorStore(docs)
  const answer = await chat(vectorStore, message)

  let result = null
  try {
    const { text } = answer

    console.log(text)

    result = text
  } catch (error) {
    console.log('analysis failed')
    result = error
  }

  return result
}

