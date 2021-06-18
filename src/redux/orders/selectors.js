import beautify from '../../helpers/beautify';
import { getImageURL } from '../../helpers/imageHelpers';
import { carsOptionsFilterSelector } from '../cars/selectors';
import { cityOptionsFilterSelector } from '../cities/selectors';
import { statusesOptionsFilterSelector } from '../statuses/selectors';

const carStub = {
  name: '',
  colors: [''],
  thumbnail: { path: '' },
};

const ordersSelector = (state) => {
  const { data, status } = state.orders;
  if (status === 'fetching') return [];
  return data.map((order) => {
    const carData = order.carId || carStub;
    return {
      mainInfo: {
        carModel: carData.name,
        carColor: order.color,
        cityName: order.cityId?.name || order.cityId,
        adress: order.pointId?.name || order.pointId,
        dateFrom: beautify.date(order.dateFrom),
        dateTo: beautify.date(order.dateTo),
        picture: getImageURL(carData.thumbnail.path),
      },
      options: {
        isFullTank: order.isFullTank,
        isNeedChildChair: order.isNeedChildChair,
        isRightWheel: order.isRightWheel,
      },
      id: order.id,
      price: beautify.currency(order.price),
    };
  });
};

const totalOrdersSelector = (state) => {
  const { total, limit } = state.orders;
  return Math.ceil(total / limit);
};

const initialPageSelector = (state) => state.orders.page;

const optionsFiltersSelector = (state) => {
  const modelOptions = carsOptionsFilterSelector(state);
  const cityOptions = cityOptionsFilterSelector(state);
  const statusOptions = statusesOptionsFilterSelector(state);
  return { modelOptions, cityOptions, statusOptions };
};

// const currentFiltersSelector = (state) => {
//   const { car, city, status } = state.orders.filters;
//   return { model: car, city, status };
// };

const isInitialSelector = (state) => state.orders.status === 'initial';

export {
  ordersSelector,
  totalOrdersSelector,
  initialPageSelector,
  optionsFiltersSelector,
  // currentFiltersSelector,
  isInitialSelector,
};
