export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' }); // 'mmm'
  const year = d.getFullYear();
  return `${day}/${month}/${year}`; // 'dd/mmm/yyyy'
};
