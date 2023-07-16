
import { getLocalDocs, initVectorStore, chat } from './chat.mjs'

export const query = async (message) => {
  const docs = await getLocalDocs()

  const docList = docs.filter(doc => doc.metadata.source.indexOf('GDP') > -1)
  const vectorStore = await initVectorStore(docs)
  const answer = await chat(vectorStore, message)

  let result = null
  try {
    const { response } = answer
    console.log('response', response)

    const text = JSON.parse(JSON.stringify(response))
    result = text
  } catch (error) {
    console.log('analysis failed', error)
    result = error
  }

  return result
}

// const data = `{
//   title: {
//     text: '山西省近20年GDP数据'
//   },
//   tooltip: {
//     trigger: 'axis'
//   },
//   legend: {
//     data: ['GDP']
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'category',
//     boundaryGap: false,
//     data: ['2003年', '2004年', '2005年', '2006年', '2007年', '2008年', '2009年', '2010年', '2011年', '2012年', '2013年', '2014年', '2015年', '2016年', '2017年', '2018年', '2019年', '2020年', '2021年', '2022年']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       name: 'GDP',
//       type: 'line',
//       stack: '总量',
//       data: [729.3, 884.8, 1410.7, 1635.4, 1953.3, 2421.1, 2809, 3318.2, 4506.8, 3903.4, 5699.2, 5139.3, 5717.9, 5345.1, 6058.5, 6523.3, 7030.5, 6746.3, 7747.3, 7562.7]
//     }
//   ]
// }`

// const text = JSON.parse(JSON.stringify(data))
// console.log(text);

