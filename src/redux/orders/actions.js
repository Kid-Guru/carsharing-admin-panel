import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { externalAllCitiesRequest } from '../cities/actions';
import { showMessage } from '../messageBar/actions';
import { externalAllStatusesRequest } from '../statuses/actions';

export const setStatus = createAction('SET_ORDERS_STATUS');
export const setOrders = createAction('SET_ORDERS');
export const setPage = createAction('SET_ORDERS_PAGE');
export const setFilter = createAction('SET_ORDERS_FILTER');
export const cleanupOrders = createAction('CLEANUP_ORDERS');

// Запрос заказов
const getOrders = () => async (dispatch, getState) => {
  const {
    limit,
    page,
    filters: { city, status },
  } = getState().orders;
  const params = {
    limit,
    page,
    city,
    status,
  };

  try {
    const responseOrders = await apiService.getOrders(params);
    const orders = responseOrders.data.data;
    dispatch(setOrders({ data: orders, total: responseOrders.data.count }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

export const initialOrdersRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  const responses = [
    dispatch(getOrders()),
    dispatch(externalAllCitiesRequest()),
    dispatch(externalAllStatusesRequest()),
  ];

  Promise.all(responses)
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const setPageOrders = (pageNumber) => async (dispatch, getState) => {
  const currentPage = getState().orders.page;
  if (currentPage === pageNumber) return;
  dispatch(setPage({ page: pageNumber }));
  dispatch(setStatus({ status: 'fetching' }));
  try {
    await dispatch(getOrders());
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(showMessage(e.message, 'alert'));
  }
};

export const setFilterOrders = (newFilter) => async (dispatch) => {
  const filters = {
    city: newFilter.city,
    status: newFilter.status,
  };
  dispatch(setFilter({ filters }));
  dispatch(setStatus({ status: 'fetching' }));
  try {
    await dispatch(getOrders());
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(showMessage(e.message, 'alert'));
  }
};
