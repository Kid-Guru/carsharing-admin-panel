import { createAction } from 'redux-actions';
import { api } from '../../api/api';

export const setOrders = createAction('SET_ORDERS');
export const setPage = createAction('SET_PAGE');
export const setStatus = createAction('SET_ORDERS_STATUS');

// Запрос заказов
// Добавить обработку ошибки
export const getOrdersRequest = () => async (dispatch, getState) => {
  const { limit, page } = getState().orders;
  const params = { limit, page };
  dispatch(setStatus({ status: 'fetching' }));
  const responseOrders = await api.getOrders(params);
  const orders = responseOrders.data.data;
  // const filtredData = orders.filter((order) => order.carId !== null);
  dispatch(setOrders({ data: orders, total: responseOrders.data.count }));
  dispatch(setStatus({ status: 'received' }));
};

export const setPageOrders = (pageNumber) => async (dispatch) => {
  dispatch(setPage({ page: pageNumber }));
  dispatch(getOrdersRequest());
};
