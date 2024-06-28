import { useState, useEffect, useRef } from 'react'
import { getWords } from '../api/word';
import Scrambler from '../operator/scramble';
import { Char } from '../types/char';

export default function Word() {

  const [value, setValue] = useState<string[]>([]);
  const scramblerRef = useRef(Scrambler.instance())

  const init = async () => {
    const word = await getWords();
    setValue([...word]);
    console.log(value)
  }

  // const handleMouseOver = (char: Char) => {
  //   scramblerRef.current
  //   .target(char)
  //   .scramble(setValue)
  // }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className="flex items-center justify-center h-screen text-[20px] tracking-[-0.5px] cursor-default"> 
      <div>
      { value || 'loading...'} 
      </div>
    </div>
  )
}
