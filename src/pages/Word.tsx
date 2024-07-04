import { useState, useEffect, useRef } from 'react'
import { getWords } from '../api/word';
import Scrambler from '../operator/scramble';
import { Char } from '../types/char';

export default function Word() {

  const [value, setValue] = useState<Char[]>([]);
  const lastExecuted = useRef<number>(0);
  const interval = 500;

  const init = async () => {
    const word = await getWords();
    setValue([...word] as Char[]);
  }

  const handleMouseOver = (char: Char, idx: number) => {
    const now = Date.now();
    if (now - lastExecuted.current > interval) {
      lastExecuted.current = now;
      Scrambler.instance()
        .target(char, idx)
        .scramble(setValue);
    }
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div className="flex items-center justify-center h-screen text-[30px] tracking-[-0.5px] cursor-default"> 
      {
        !!value && value.map((char, idx) => 
          <span key={idx} onMouseOver={() => handleMouseOver(char, idx)}>{char}</span>
        )
      }
    </div>
  )
}
