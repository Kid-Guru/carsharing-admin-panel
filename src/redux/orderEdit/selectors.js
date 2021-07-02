import { cityOptionsSelector } from '../cities/selectors';
import { statusOptionsSelector } from '../statuses/selectors';
import { rateOptionsSelector } from '../rates/selectors';

const initCitySelector = (state) => state.order.data.cityId?.id || state.order.data.cityId;

const initPointSelector = (state) => state.order.data.pointId?.id || state.order.data.pointId;

const initStatusSelector = (state) => state.order.data.orderStatusId?.id
  || state.order.data.orderStatusId;

const initRateSelector = (state) => state.order.data.rateId?.id || state.order.data.rateId;

const initCarSelector = (state) => state.order.data.carId?.id || state.order.data.carId;

const initColorSelector = (state) => state.order.data.color?.toLowerCase();

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
  return {
    cityOptions, statusOptions, rateOptions,
  };
};

const isFetchingSelector = (state) => state.order.status === 'fetching';
const isTrasferSeccuessSelector = (state) => state.order.status === 'transferSeccuess';
const isNotFoundSelector = (state) => state.order.status === 'notFound';

export {
  fieldsOptionsSelector,
  initValuesSelector,
  isFetchingSelector,
  isTrasferSeccuessSelector,
  isNotFoundSelector,
};
