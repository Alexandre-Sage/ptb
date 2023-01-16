export const serverDateToLocalString = (date: string | Date) =>
  new Date(date).toLocaleDateString();
