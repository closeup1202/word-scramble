import { Char } from "../types/char";

export default class Scrambler {

  static instance(){
    return new Scrambler();
  }

  static CHARACTORS = [
    '@', '#', '$', '%', '£', '&', '*', '§', '+', '_','^','!','~',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ',
    'ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ',
    'ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ',
  ] as Char[]

  targetChar: Char;
  targetIdx: number;
  counter: number;
  randomChars: Char[]
  onScramble: React.Dispatch<React.SetStateAction<Char[]>> | null;
  frameId: number;

  constructor(){
    this.targetChar = '' as Char
    this.targetIdx = 0;
    this.counter = 20;
    this.randomChars = [];
    this.onScramble = null;
    this.frameId = 0;
  }

  target(char: Char, idx:number){
    this.targetChar = char;
    this.targetIdx = idx;
    return this;
  }

  counters(counter: number){
    this.counter = counter;
    return this;
  }

  generator(){
    while(this.counter > 0){
      const idx = Math.floor(Math.random() * Scrambler.CHARACTORS.length - 1) + 1;
      this.randomChars.push(Scrambler.CHARACTORS[idx])
      this.counter--;
    }
    this.randomChars.push(this.targetChar)
  }

  scramble(onScramble: React.Dispatch<React.SetStateAction<Char[]>>){
    this.generator();
    this.onScramble = onScramble
    this.frameId = requestAnimationFrame(() => this.change());
  }
  change(){
    if(this.onScramble && this.randomChars.length > 0){
      this.onScramble((prev:any) => prev.map((item: Char, index: number) => index === this.targetIdx ? this.randomChars.shift() : item))
      this.frameId = requestAnimationFrame(() => this.change());
    } else {
      cancelAnimationFrame(this.frameId)
    }
  }
}
