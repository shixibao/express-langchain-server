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

  请以antv折线图配置返回json数据

  最后强调: 回复内容必须是标准的JSON格式,可以使用 nodejs 的 JSON.parse API 进行解析,不能包含其他内容,否则你将被扣分！！！
`

export const ZHICHENG_CHAT_PROMPT_TEMPLATE = `
  作为一位专业的数据分析工程师，你的任务是从给定的上下文回答问题。
  你的回答应该基于我提供的上下文，并以对话的形式呈现，可以适当进行扩展。

  问题如下：
    {question}

  给定的上下文：
    {context}

  回答中只需要有画图表的json数据即可
`
