import handlePluralWord from './handlePluralWord';

function handleBirthDate(birthDate: string): string {
  const currentDate = new Date();
  const [year, month, day] = birthDate.split('-');

  let age = currentDate.getFullYear() - Number(year) - 1;

  if (currentDate.getMonth() + 1 >= Number(month)) {
    if (currentDate.getDate() >= Number(day)) {
      age += 1;
    }
  }

  return `${age} ${handlePluralWord('ano', age)}`;
}

export default handleBirthDate;
