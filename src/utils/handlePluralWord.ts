function handlePluralWord(word: string, value: number): string {
  if (value === 1) {
    return word;
  }

  return `${word}s`;
}

export default handlePluralWord;
