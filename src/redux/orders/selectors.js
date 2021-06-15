import beautify from '../../helpers/beautify';
import { getImageURL } from '../../helpers/imageHelpers';
import { carsOptionsFilterSelector } from '../cars/selectors';
import { cityOptionsFilterSelector } from '../cities/selectors';
import { statusesOptionsFilterSelector } from '../statuses/selectors';

// Костыль для невылидных данных с сервера
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
        cityName: order.cityId.name,
        adress: order.pointId?.name,
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
  const modelOption = carsOptionsFilterSelector(state);
  const cityOption = cityOptionsFilterSelector(state);
  const statusOption = statusesOptionsFilterSelector(state);
  return { modelOption, cityOption, statusOption };
};

const currentFiltersSelector = (state) => {
  const { car, city, status } = state.orders.filters;
  return { model: car, city, status };
};

const isFetchingSelector = (state) => state.orders.status === 'fetching';

export {
  ordersSelector,
  totalOrdersSelector,
  initialPageSelector,
  optionsFiltersSelector,
  currentFiltersSelector,
  isFetchingSelector,
};
