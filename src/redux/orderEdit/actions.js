import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCars } from '../cars/actions';
import { carByIdSelector } from '../cars/selectors';
import { getAllCities } from '../cities/actions';
import { cityByIdSelector } from '../cities/selectors';
import { getAllPoints } from '../points/actions';
import { pointByIdSelector } from '../points/selectors';
import { getAllRates } from '../rates/actions';
import { rateByIdSelector } from '../rates/selectors';
import { getAllStatuses } from '../statuses/actions';
import { statusByIdSelector } from '../statuses/selectors';

export const setStatus = createAction('SET_ORDER_STATUS');
export const setOrder = createAction('SET_ORDER');
export const cleanupOrder = createAction('CLEANUP_ORDER');

// Добавить обработку ошибки
const getOrder = (id) => async (dispatch) => {
  const params = { id };
  const responseOrder = await apiService.getOrders(params);
  const order = responseOrder.data.data?.[0];
  dispatch(setOrder({ data: order }));
};

export const orderRequest = (id) => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [
    dispatch(getOrder(id)),
    dispatch(getAllCars()),
    dispatch(getAllCities()),
    dispatch(getAllStatuses()),
    dispatch(getAllPoints()),
    dispatch(getAllRates()),
  ];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => {
      console.log(e);
      dispatch(setStatus({ status: 'error' }));
    });
};

export const orderUpdate = (orderData) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { price, id } = getState().order.data;
  const requestBody = {
    carId: carByIdSelector(getState(), orderData.car),
    cityId: cityByIdSelector(getState(), orderData.city),
    pointId: pointByIdSelector(getState(), orderData.point),
    rateId: rateByIdSelector(getState(), orderData.rate),
    orderStatusId: statusByIdSelector(getState(), orderData.status),
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
    if (e.response.status >= 200) {
      dispatch(setStatus({ status: 'transferError' }));
    } else {
      throw e;
    }
  }
};
