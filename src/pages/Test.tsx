import { useState } from 'react'

interface ITest {
  id: number;
  name: string;
}

export default function Word() {

  const [test, setTest] = useState<ITest>({
    id: 1,
    name: 'geonhong'
  })

  const [test2, setTest2] = useState<number[]>([1,2,3,4,5])

  const handleClick = () => {
    setTest(prev => ({...prev, id: 2}))
  }

  const handleClick2 = () => {
    setTest2(test2 => test2.map((item, index) => index === 1 ? 3 : item));
  }

  return (
      <div>
        <button onClick={handleClick}>{test.id}</button> <br/>
        <button onClick={handleClick2}>{test2}</button>
      </div>
  )
}
