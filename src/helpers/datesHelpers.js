/* eslint-disable import/prefer-default-export */
const prettyDate = (timeStamp) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(timeStamp).toLocaleString('ru-RU', options);
};

export { prettyDate };
