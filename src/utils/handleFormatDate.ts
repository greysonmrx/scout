function handleFormatDate(timestamp: string): string {
  const date = new Date(timestamp);

  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  return `${date.getFullYear()}-${month}-${day}`;
}

export default handleFormatDate;
