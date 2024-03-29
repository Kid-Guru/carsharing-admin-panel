import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { externalAllCitiesRequest } from '../cities/actions';
import { cityByIdSelector } from '../cities/selectors';
import { showMessage } from '../messageBar/actions';
import { externalAllPointsRequest } from '../points/actions';
import { pointByIdSelector } from '../points/selectors';
import { externalAllRatesRequest } from '../rates/actions';
import { rateByIdSelector } from '../rates/selectors';
import { externalAllStatusesRequest } from '../statuses/actions';
import { statusByIdSelector } from '../statuses/selectors';

export const setStatus = createAction('SET_ORDER_STATUS');
export const setOrder = createAction('SET_ORDER');
export const cleanupOrder = createAction('CLEANUP_ORDER');

const getOrder = (id) => async (dispatch) => {
  const params = { id };
  try {
    const responseOrder = await apiService.getOrders(params);
    const orders = responseOrder.data.data;
    if (orders.length === 0) {
      dispatch(setStatus({ status: 'notFound' }));
      throw new Error(`Заказ с id ${id} не найден`);
    }
    dispatch(setOrder({ data: orders[0] }));
  } catch (e) {
    if (e.response || e.request) {
      throw new Error('Произошла ошибка получения данных. Попробуйте еще');
    }
    throw e;
  }
};

export const orderRequest = (id) => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [
    dispatch(getOrder(id)),
    dispatch(externalAllCitiesRequest()),
    dispatch(externalAllStatusesRequest()),
    dispatch(externalAllPointsRequest()),
    dispatch(externalAllRatesRequest()),
  ];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const orderUpdate = (orderData) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { id, carId } = getState().order.data;
  const requestBody = {
    carId,
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
    price: orderData.price,
    id,
  };
  try {
    await apiService.putOrders(id, requestBody);
    dispatch(setStatus({ status: 'transferSeccuess' }));
    dispatch(showMessage('Заказ успешно изменен!!', 'success'));
  } catch (e) {
    dispatch(showMessage(e.message, 'alert'));
  }
};
