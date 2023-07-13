import { ChatOpenAI } from "langchain/chat_models/openai";
import { SerpAPI } from 'langchain/tools'
import { ChatPromptTemplate, HumanMessagePromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate, } from 'langchain/prompts'
import { BufferMemory } from 'langchain/memory'
import { ChatAgent, AgentExecutor, initializeAgentExecutorWithOptions } from "langchain/agents";

const chat = new ChatOpenAI({
  temperature: 0.9
})

const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY
export const googleSearch = async (message) => {
  const tools = [
    new SerpAPI(SERPAPI_API_KEY, {
      location: "Austin,Texas,United States",
      hl: "en",
      gl: "us",
    }),
  ];

  const systemPrompt = `
    You are a powerful AI assistant. You are named '盈盈'.

    Please note the following rules:
    1. Don't split the user's question.
    2. Your response should be in Simplified Chinese language and be as precise, comprehensive, and high-quality as possible.
    3. If there is a percentage in the question, such as market share, sales percentage, etc., the formatted output will be ".2%"

    `
  // 4. 请以一下json数据格式返回:
  // {
  //   {
  //     question: '',
  //       title: '',
  //         unit: '',
  //           xField: 'x',
  //             yField: 'y',
  //               data: [x: '', y: '']
  //   }
  // }

  const chatPrompt = ChatPromptTemplate.fromPromptMessages(
    [
      SystemMessagePromptTemplate.fromTemplate(systemPrompt),
      new MessagesPlaceholder('history'),
      HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]
  )

  // const agent = ChatAgent.fromLLMAndTools(chat, tools)

  const executor = await initializeAgentExecutorWithOptions(tools, chat, {
    agentType: 'chat-zero-shot-react-description',
    memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
    prompt: chatPrompt,
    verbose: false
  })

  // const executor = AgentExecutor.fromAgentAndTools({ agent, tools, verbose: false })

  const resG = await executor.run(message)

  return resG
}

