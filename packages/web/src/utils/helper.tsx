const LANG = 'pt-BR';
const CURRENCY = 'BRL';

export const amountFormat = (value) => {
  value = parseFloat(value);
  return value?.toLocaleString(LANG, {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: CURRENCY,
  });
};

export const dateFormat = (value) => {
  value = new Date(value);
  return value?.toLocaleString();
};
