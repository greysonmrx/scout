type ICharMap = {
  [char: string]: string;
};

const charMap: ICharMap = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
  I: 'i',
  J: 'j',
  K: 'k',
  L: 'l',
  M: 'm',
  N: 'n',
  Ñ: 'n',
  O: 'o',
  P: 'p',
  Q: 'q',
  R: 'r',
  S: 's',
  T: 't',
  U: 'u',
  V: 'v',
  W: 'w',
  X: 'x',
  Y: 'y',
  Z: 'z',
  ' ': '-',
  Ç: 'c',
  ç: 'c',
  Ã: 'a',
  ã: 'a',
  á: 'a',
  Á: 'a',
  à: 'a',
  À: 'a',
  â: 'a',
  Â: 'a',
  é: 'e',
  É: 'e',
  è: 'e',
  È: 'e',
  ê: 'e',
  Ê: 'e',
  í: 'i',
  Í: 'i',
  ì: 'i',
  Ì: 'i',
  î: 'i',
  Î: 'i',
  ó: 'o',
  Ó: 'o',
  ò: 'o',
  Ò: 'o',
  õ: 'o',
  Õ: 'o',
  ô: 'o',
  Ô: 'o',
  ú: 'u',
  Ú: 'u',
  ù: 'u',
  Ù: 'u',
  û: 'u',
  Û: 'u',
};

function handleSlugWord(word: string): string {
  return word.split('').map((letter) => (charMap[letter] ? charMap[letter] : letter)).join('');
}

export default handleSlugWord;