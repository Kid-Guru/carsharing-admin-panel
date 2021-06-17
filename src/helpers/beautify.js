const carNumber = (str) => {
  const regexpCarNumber = /(\D+)(\d+)(\D+)(\w+)?/;
  if (regexpCarNumber.test(str)) {
    return str.match(regexpCarNumber)
      .slice(1)
      .filter((s) => s !== undefined)
      .map((s) => s.trim().toUpperCase())
      .join('');
  }
  return (str);
};

const currency = (price) => {
  const options = {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'RUB',
    maximumFractionDigits: 0,
  };
  return new Intl.NumberFormat('ru-RU', options).format(price);
};

const date = (timeStamp) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  if (!timeStamp) return '';
  return new Date(timeStamp).toLocaleString('ru-RU', options);
};

export default {
  carNumber,
  currency,
  date,
};
