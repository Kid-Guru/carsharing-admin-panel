import beautify from './beautify';

const mapConversionFactor = {
  сутки: 86400000,
  '7 дней': 604800000,
  мин: 60000,
};
const costOptions = {
  fullTank: 500,
  childChair: 200,
  rightWheel: 1600,
};

const calculateRentPrice = ({
  rate, dateFrom, dateTo, isFullTank, isNeedChildChair, isRightWheel,
}) => {
  const conversionFactor = mapConversionFactor[rate.unit];
  let price = rate.price * ((dateTo - dateFrom) / conversionFactor);
  if (isFullTank) price += costOptions.fullTank;
  if (isNeedChildChair) price += costOptions.childChair;
  if (isRightWheel) price += costOptions.rightWheel;
  return beautify.currency(Math.floor(price));
};

export default calculateRentPrice;
