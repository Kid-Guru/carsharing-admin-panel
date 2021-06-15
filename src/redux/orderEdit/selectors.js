import { carsOptionsSelector } from '../cars/selectors';
import { cityOptionsSelector } from '../cities/selectors';
import { statusOptionsSelector } from '../statuses/selectors';
import { rateOptionsSelector } from '../rates/selectors';
import beautify from '../../helpers/beautify';

const initCitySelector = (state) => {
  const { cityId } = state.order.data;
  return cityId && cityId.id;
};
const initPointSelector = (state) => {
  const { pointId } = state.order.data;
  return pointId && pointId.id;
};
const initStatusSelector = (state) => {
  const { orderStatusId } = state.order.data;
  return orderStatusId && orderStatusId.id;
};
const initRateSelector = (state) => {
  const { rateId } = state.order.data;
  return rateId && rateId.id;
};
const initCarSelector = (state) => {
  const { carId } = state.order.data;
  return carId && carId.id;
};
const initColorSelector = (state) => state.order.data?.color?.toLowerCase();
const initDateSelector = (state) => {
  const { dateFrom, dateTo } = state.order.data;
  return [dateFrom, dateTo];
};
const initExtraOptionsSelector = (state) => {
  const { isFullTank, isNeedChildChair, isRightWheel } = state.order.data;
  return [isFullTank, isNeedChildChair, isRightWheel];
};
const initPriceSelector = (state) => state.order.data?.price;

const initValuesSelector = (state) => {
  const initCity = initCitySelector(state);
  const initPoint = initPointSelector(state);
  const initStatus = initStatusSelector(state);
  const initRate = initRateSelector(state);
  const initCar = initCarSelector(state);
  const [initDateFrom, initDateTo] = initDateSelector(state);
  const initColor = initColorSelector(state);
  const [initIsFullTank, initIsNeedChildChair, initIsRightWheel] = initExtraOptionsSelector(state);
  const initPrice = initPriceSelector(state);
  return {
    initCity,
    initPoint,
    initStatus,
    initRate,
    initCar,
    initColor,
    initDateFrom,
    initDateTo,
    initIsFullTank,
    initIsNeedChildChair,
    initIsRightWheel,
    initPrice,
  };
};

const fieldsOptionsSelector = (state) => {
  const cityOptions = cityOptionsSelector(state);
  const statusOptions = statusOptionsSelector(state);
  const rateOptions = rateOptionsSelector(state);
  const carOptions = carsOptionsSelector(state);
  return {
    cityOptions, statusOptions, rateOptions, carOptions,
  };
};

const orderPriceSelector = (state) => state.order.data.price
  && beautify.currency(Math.floor(state.order.data.price));

const isFetchingSelector = (state) => state.order.status === 'fetching';
const isTrasferSeccuessSelector = (state) => state.order.status === 'transferSeccuess';

export {
  fieldsOptionsSelector,
  initValuesSelector,
  isFetchingSelector,
  isTrasferSeccuessSelector,
  orderPriceSelector,
};
