import { carsOptionsSelector } from '../cars/selectors';
import { cityOptionsSelector } from '../cities/selectors';
import { statusOptionsSelector } from '../statuses/selectors';
import { pointOptionsSelector } from '../points/selectors';
import { rateOptionsSelector } from '../rates/selectors';

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
const initColorSelector = (state) => state.order.data.color.toLowerCase();
const initDateSelector = (state) => {
  const { dateFrom, dateTo } = state.order.data;
  return [dateFrom, dateTo];
};
const initExtraOptionsSelector = (state) => {
  const { isFullTank, isNeedChildChair, isRightWheel } = state.order.data;
  return [isFullTank, isNeedChildChair, isRightWheel];
};

const initValuesSelector = (state) => {
  const initCity = initCitySelector(state);
  const initPoint = initPointSelector(state);
  const initStatus = initStatusSelector(state);
  const initRate = initRateSelector(state);
  const initCar = initCarSelector(state);
  const [initDateFrom, initDateTo] = initDateSelector(state);
  const initColor = initColorSelector(state);
  const [initIsFullTank, initIsNeedChildChair, initIsRightWheel] = initExtraOptionsSelector(state);
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
  };
};

const colorOptionsSelector = (state) => {
  const selectedCarId = initCarSelector(state);
  const { data } = state.cars;
  const findedCar = data.find((c) => c.id === selectedCarId);
  return findedCar ? findedCar.colors.map((c) => c.toLowerCase()) : [];
};

const fieldsOptionsSelector = (state) => {
  const cityOptions = cityOptionsSelector(state);
  const pointOptions = pointOptionsSelector(state);
  const statusOptions = statusOptionsSelector(state);
  const rateOptions = rateOptionsSelector(state);
  const carOptions = carsOptionsSelector(state);
  const colorOptions = colorOptionsSelector(state);
  return {
    cityOptions, pointOptions, statusOptions, rateOptions, carOptions, colorOptions,
  };
};

const isFetchingSelector = (state) => state.order.status === 'fetching';
const isTrasferSeccuessSelector = (state) => state.order.status === 'transferSeccuess';

export {
  fieldsOptionsSelector,
  initValuesSelector,
  isFetchingSelector,
  isTrasferSeccuessSelector,
};
