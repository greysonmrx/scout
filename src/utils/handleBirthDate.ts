import handlePluralWord from './handlePluralWord';

function handleBirthDate(birthDate: string): string {
  const currentDate = new Date();
  const [year, month, day] = birthDate.split('T')[0].split('-').map(value => Number(value));

  let age = currentDate.getFullYear() - year;

  if (currentDate < new Date(currentDate.getFullYear(), month - 1, day)) {
    age -= 1;
  }

  return `${age} ${handlePluralWord('ano', age)}`;
}

export default handleBirthDate;
