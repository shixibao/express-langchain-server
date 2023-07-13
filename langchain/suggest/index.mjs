import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from 'langchain/chains'

const llm = new OpenAI({
  temperature: 0.9
})

export const query = async (message) => {
  console.log('suggent langchain ...')

  const template = `Recommended 3 similar prompts with {message}, and return json data. eg:['xxx'], and 可以使用浏览器 的 JSON.parse API 进行解析 `;
  const prompt = new PromptTemplate({
    template,
    inputVariables: ["message"],
  });

  const chain = new LLMChain({
    llm,
    prompt
  })

  let result = []
  try {
    result = await chain.call({ message })

    return result
  } catch (error) {
    console.log(error)
  }

  return result
}

