import { prettyCurrency } from '../../helpers/currencyHelper';
import { prettyDate } from '../../helpers/datesHelpers';
import { getImageURL } from '../../helpers/imageHelpers';

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
    const carData = order.carId === null ? carStub : order.carId;
    return {
      mainInfo: {
        carModel: carData.name,
        carColor: carData.colors[0],
        cityName: order.cityId.name,
        adress: order.cityId.name,
        dateFrom: prettyDate(order.dateFrom),
        dateTo: prettyDate(order.dateTo),
        picture: getImageURL(carData.thumbnail.path),
      },
      options: {
        isFullTank: order.isFullTank,
        isNeedChildChair: order.isNeedChildChair,
        isRightWheel: order.isRightWheel,
      },
      id: order.id,
      price: prettyCurrency(order.price),
    };
  });
};

const totalOrdersSelector = (state) => {
  const { total, limit } = state.orders;
  return Math.ceil(total / limit);
};

export { ordersSelector, totalOrdersSelector };
