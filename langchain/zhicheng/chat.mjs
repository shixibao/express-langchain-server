import path from 'path'
import fs from 'fs'

import { LLMChain, ConversationChain } from 'langchain/chains'
import { PromptTemplate } from 'langchain/prompts'
import { OpenAI } from 'langchain/llms/openai'
import { BufferMemory, ConversationSummaryMemory } from 'langchain/memory'

import { DirectoryLoader } from 'langchain/document_loaders/fs/directory'
import { CSVLoader } from 'langchain/document_loaders/fs/csv'
import { TextLoader } from 'langchain/document_loaders/fs/text'

import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { HNSWLib } from 'langchain/vectorstores/hnswlib'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'

import { PROMPT_TEMPLATE, ZHICHENG_CHAT_PROMPT_TEMPLATE, QUESTION_PROMPT_TEMPLATE } from './prompt.mjs'

const CWD_PATH = process.cwd()

const DATA_PATH = path.join(CWD_PATH, 'static/raw/zhicheng')

const VENCTOR_DATA_PATH = path.join(CWD_PATH, 'static/data_venctor/zhicheng')

const getFileName = (path) => {
  const parts = path.split("/");
  return parts.pop() || '';
}

const getLocalFiles = () => fs.readFileSync(DATA_PATH)

const getLocalDocs = async () => {

  const loader = new DirectoryLoader(DATA_PATH, {
    // '.txt': path => new TextLoader(path),
    '.csv': path => new CSVLoader(path)
  })
  const docs = await loader.load()
  return docs
}

const initVectorStore = async rawDocs => {
  if (fs.existsSync(`${VENCTOR_DATA_PATH}/docstore.json`)) {
    const vectorStore = await HNSWLib.load(VENCTOR_DATA_PATH, new OpenAIEmbeddings({}))
    return vectorStore
  }

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  })

  const docs = await textSplitter.splitDocuments(rawDocs)
  const vectorStore = await HNSWLib.fromDocuments(
    docs,
    new OpenAIEmbeddings({
      verbose: true
    })
  )

  await vectorStore.save(VENCTOR_DATA_PATH)

  console.log('save vectorstore data success')

  return vectorStore
}

const model = new OpenAI({ temperature: 0, maxTokens: -1 })

// const memory = new BufferMemory({ inputKey: "question", returnMessages: true, memoryKey: 'history' })
const memory2 = new ConversationSummaryMemory({ inputKey: "question", memoryKey: 'history', llm: model })

const _generateChain = () => {
  const prompt = PromptTemplate.fromTemplate(
    ZHICHENG_CHAT_PROMPT_TEMPLATE
  )
  return new ConversationChain({
    llm: model,
    prompt,
    memory: memory2
  })
}

const _chatWithLLM = async (options) => {
  const { question, referenceContext } = options
  const chain = _generateChain()
  const res = await chain.call({ question, context: referenceContext })
  return res
}

const chat = async (vectorStore, question) => {
  const referenceContextDocuments = await vectorStore.similaritySearch(question, 1);
  const contextString = (referenceContextDocuments || []).map(docItem => `[${getFileName(docItem.metadata.source)}] ${docItem.pageContent}`).join('/n')
  const answer = await _chatWithLLM({ question, referenceContext: contextString })
  return answer
}

export {
  getLocalFiles,
  getLocalDocs,
  initVectorStore,
  chat
}
