function handleFormatedDate(timestamps: string): string {
  const date = new Date(timestamps);
  let day = String(date.getDate());
  let month = String((date.getMonth() + 1));

  if (Number(day) < 10) {
    day = `0${day}`;
  }

  if (Number(month) < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}/${date.getFullYear()}`;
}

export default handleFormatedDate;
