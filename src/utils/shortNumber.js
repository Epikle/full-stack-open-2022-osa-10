export const shortNumber = (number) => {
  // eslint-disable-next-line no-undef
  const short = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(number);
  return short.toLowerCase();
};
