const prettyCurrency = (price) => {
  const options = {
    style: 'currency',
    currencyDisplay: 'symbol',
    currency: 'RUB',
    maximumFractionDigits: 0,
  };
  return new Intl.NumberFormat('ru-RU', options).format(price);
};

export { prettyCurrency };
