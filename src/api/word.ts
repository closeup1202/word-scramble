import axios from "axios";

export async function getWords(){
  const serviceKey = 'c42b5b07-0eb4-48b5-90d4-5d5faf417004'
  const randomValue = Math.floor(Math.random() * 100) + 1;
  const randomValue2 = Math.floor(Math.random() * 10) + 1;
  try {
    const { data } = await axios.get('http://api.kcisa.kr/openapi/service/rest/meta12/getKRAG04121', {
      params:{
        serviceKey,
        numOfRows: '10',
        pageNo: randomValue
      }
    })
    const word = data?.response?.body?.items?.item[randomValue2 - 1].title
    return word
  } catch (error) {
    new Error("API ERROR")
  }
}