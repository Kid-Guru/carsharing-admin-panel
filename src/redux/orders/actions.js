import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCars } from '../cars/actions';
import { getAllCities } from '../cities/actions';
import { getAllStatuses } from '../statuses/actions';

export const setStatus = createAction('SET_ORDERS_STATUS');
export const setOrders = createAction('SET_ORDERS');
export const setPage = createAction('SET_ORDERS_PAGE');
export const setFilter = createAction('SET_ORDERS_FILTER');
export const cleanupOrders = createAction('CLEANUP_ORDERS');

// Запрос заказов
const getOrders = () => async (dispatch, getState) => {
  const { limit, page, filters: { city, status, car } } = getState().orders;
  const params = {
    limit,
    page,
    city,
    status,
    car,
  };

  try {
    const responseOrders = await apiService.getOrders(params);
    const orders = responseOrders.data.data;
    dispatch(setOrders({ data: orders, total: responseOrders.data.count }));
  } catch (e) {
    throw new Error('Ошибка получения данных');
  }
};

export const initialOrdersRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [
    dispatch(getOrders()),
    dispatch(getAllCars()),
    dispatch(getAllCities()),
    dispatch(getAllStatuses()),
  ];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => {
      console.log(e);
      dispatch(setStatus({ status: 'error' }));
    });
};

const getOrdersRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'updating' }));
  try {
    await dispatch(getOrders());
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    console.log(e);
    dispatch(setStatus({ status: 'error' }));
  }
};

export const setPageOrders = (pageNumber) => async (dispatch, getState) => {
  const currentPage = getState().orders.page;
  if (currentPage === pageNumber) return;
  dispatch(setPage({ page: pageNumber }));
  dispatch(getOrdersRequest());
};

export const setFilterOrders = (newFilter) => async (dispatch) => {
  const filters = {
    car: newFilter.model,
    city: newFilter.city,
    status: newFilter.status,
  };
  dispatch(setFilter({ filters }));
  dispatch(getOrdersRequest());
};
