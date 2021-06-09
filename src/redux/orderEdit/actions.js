import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setStatus = createAction('SET_ORDER_STATUS');
export const setOrder = createAction('SET_ORDER');
export const setExtraData = createAction('SET_EXTRA_DATA');
export const cleanupOrder = createAction('CLEANUP_ORDER');

// Запрос одного заказа
// Добавить обработку ошибки
const getOrder = (id) => async (dispatch) => {
  const params = { id };
  const responseOrder = await apiService.getOrders(params);
  const order = responseOrder.data.data?.[0];
  dispatch(setOrder({ data: order }));
};

const getExtraData = () => async (dispatch) => {
  const extraData = {
    cars: [],
    cities: [],
    points: [],
    rates: [],
    statuses: [],
  };
  const responseMap = ['cars', 'cities', 'points', 'rates', 'statuses'];
  const requests = [
    apiService.getCars(),
    apiService.getCities(),
    apiService.getPoints(),
    apiService.getRates(),
    apiService.getStatuses(),
  ];
  return Promise.all(requests).then((responses) => {
    responses.forEach((r, i) => {
      extraData[responseMap[i]] = r.data.data;
    });
    dispatch(setExtraData({ extraData }));
  });
};

export const orderRequest = (id) => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [dispatch(getOrder(id)), dispatch(getExtraData())];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => console.log(e));
};

export const orderUpdate = (orderData) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { price, id } = getState().order.data;
  const {
    cars, cities, points, rates, statuses,
  } = getState().order.extraData;
  const requestBody = {
    carId: cars.find((c) => c.id === orderData.car),
    cityId: cities.find((c) => c.id === orderData.city),
    pointId: points.find((p) => p.id === orderData.point),
    rateId: rates.find((r) => r.id === orderData.rate),
    orderStatusId: statuses.find((s) => s.id === orderData.status),
    color: orderData.color,
    dateFrom: orderData.dateFrom,
    dateTo: orderData.dateTo,
    isFullTank: orderData.isFullTank,
    isNeedChildChair: orderData.isNeedChildChair,
    isRightWheel: orderData.isRightWheel,
    price,
    id,
  };
  try {
    await apiService.putOrders(id, requestBody);
    dispatch(setStatus({ status: 'transferSeccuess' }));
  } catch (e) {
    if (e.response.status.toString().slice(0, 1) !== 2) {
      dispatch(setStatus({ status: 'transferError' }));
    } else {
      throw e;
    }
  }
};
