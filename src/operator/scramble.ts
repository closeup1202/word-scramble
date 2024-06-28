import { Char } from "../types/char";

export default class Scrambler {

  static instance(){
    return new Scrambler();
  }

  static CHARACTORS: string[] = [
    '@', '#', '$', '%', '£', '&', '*', '§', '+', '_','^','!','~',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ',
    'ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ',
    'ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ',
  ];

  sourceChars: string | undefined;
  targetChar: Char | undefined
  counter: number;
  onScramble: React.Dispatch<React.SetStateAction<string>> | null;
  frameId: number | null;
  frameIndex: number;

  constructor(){
    this.counter = 12;
    this.sourceChars = undefined;
    this.onScramble = null;
    this.frameId = null;
    this.frameIndex = 0;
  }

  target(char: Char){
    this.targetChar = char
    return this;
  }

  counters(counter: number){
    this.counter = counter;
    return this;
  }

  private select(){
    let temp = '';
    if(this.counter){
      while(this.counter-- > 0){
        const idx = Math.floor(Math.random() * Scrambler.CHARACTORS.length - 1) + 1;
        temp += Scrambler.CHARACTORS[idx]
      }
    }
    return temp + this.targetChar;
  }

  scramble(onScramble: React.Dispatch<React.SetStateAction<string>>){
    this.sourceChars = this.select();
    this.onScramble = onScramble
    this.frameId = requestAnimationFrame(() => this.change());
  }

  change(){
    if(this.onScramble && this.sourceChars){
      this.onScramble(this.sourceChars[1])
    }
  }
}
