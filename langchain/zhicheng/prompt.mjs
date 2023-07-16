export const PROMPT_TEMPLATE = `
 本地数据是GDP、人口、社会消费零售品零售总额年度数据

  基础字段解释：
    x_data: x轴数据
    y_data: y轴数据
    unit: 单位
    title: 图表的标题
    question: 问题

  问题如下：
    >>> {question} <<<

  给定的上下文：
    {context}

  最后强调: 回复内容必须是标准的JSON格式,可以使用 nodejs 的 JSON.parse API 进行解析,不能包含其他内容,否则你将被扣分！！！
`

export const QUESTION_PROMPT_TEMPLATE = `
  你的任务是分析给定的问题，对问题进行补充，并返回完整问题。

  历史对话
  {history}

  当前问题
  {question}

  给定的上下文：
  {context}

  请综合上述信息，并结合以下判断条件完整问题：
    1. 如果语句完整直接返回
    2. 如果句子成分不完整，则需要从历史对话中获取城市名称
    3. 完整句子示例: "<天津市的人口数据>"

  请返回JSON格式的回答:

    前括号
      text: "<这里放你的回答>"
    后括号

  最后强调: 回复内容不能包含除给出的句子示例的其他成分，否则你将被扣分！！！
`

export const ZHICHENG_CHAT_PROMPT_TEMPLATE = `
  作为一位专业的数据分析工程师，你的任务是结合历史对话、给定的上下文和当前问题进行回答。
  你的回答应该基于我提供的上下文，并以对话的形式呈现，可以适当进行扩展。

  历史对话
  {history}

  给定的上下文：
  {context}

  当前问题
  {question}

  回答遵循以下规则：
  1. 以js语法中的JSON.parse处理后的json数据格式返回
  2. 只需要返回使用echarts图表语法画图的options的json数据
  3. 返回的json数据可以被js语法中的JSON.parse函数格式化
  5. 如果问题完整直接使用
  6. 如果问题不完整，则需要从历史对话中结合地区、指标、年份等数据
`
