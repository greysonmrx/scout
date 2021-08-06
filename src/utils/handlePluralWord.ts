function handlePluralWord(word: string, value: number, suffix = 's'): string {
  if (value === 1) {
    return word;
  }

  return word + suffix;
}

export default handlePluralWord;
