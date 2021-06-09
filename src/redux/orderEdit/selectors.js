// import { prettyCurrency } from '../../helpers/currencyHelper';
// import { prettyDate } from '../../helpers/datesHelpers';
// import { getImageURL } from '../../helpers/imageHelpers';

// Костыль для невылидных данных с сервера
// const carStub = {
//   name: '',
//   colors: [''],
//   thumbnail: { path: '' },
// };

// const ordersSelector = (state) => {
//   const { data, status } = state.orders;
//   if (status === 'fetching') return [];
//   return data.map((order) => {
//     const carData = order.carId || carStub;
//     return {
//       mainInfo: {
//         carModel: carData.name,
//         carColor: carData.colors[0],
//         cityName: order.cityId.name,
//         adress: order.cityId.name,
//         dateFrom: prettyDate(order.dateFrom),
//         dateTo: prettyDate(order.dateTo),
//         picture: getImageURL(carData.thumbnail.path),
//       },
//       options: {
//         isFullTank: order.isFullTank,
//         isNeedChildChair: order.isNeedChildChair,
//         isRightWheel: order.isRightWheel,
//       },
//       id: order.id,
//       price: prettyCurrency(order.price),
//     };
//   });
// };

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

const cityOptionsSelector = (state) => {
  const { cities } = state.order.extraData;
  return cities.map((c) => ({ label: c.name, value: c.id }));
};
const pointOptionsSelector = (state) => {
  const { points } = state.order.extraData;
  return points.map((p) => ({ label: p.name, value: p.id }));
};
const statusOptionsSelector = (state) => {
  const { statuses } = state.order.extraData;
  return statuses.map((s) => ({ label: s.name, value: s.id }));
};
const rateOptionsSelector = (state) => {
  const { rates } = state.order.extraData;
  return rates.map((r) => ({ label: r.rateTypeId.name, value: r.id }));
};
const carOptionsSelector = (state) => {
  const { cars } = state.order.extraData;
  return cars.map((c) => ({ label: c.name, value: c.id }));
};
const colorOptionsSelector = (state) => {
  const selectedCarId = initCarSelector(state);
  const { cars } = state.order.extraData;
  const findedCar = cars.find((c) => c.id === selectedCarId);
  return findedCar ? findedCar.colors.map((c) => c.toLowerCase()) : [];
};

const fieldsOptionsSelector = (state) => {
  const cityOptions = cityOptionsSelector(state);
  const pointOptions = pointOptionsSelector(state);
  const statusOptions = statusOptionsSelector(state);
  const rateOptions = rateOptionsSelector(state);
  const carOptions = carOptionsSelector(state);
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
