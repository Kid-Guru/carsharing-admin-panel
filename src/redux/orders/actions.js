import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setStatus = createAction('SET_ORDERS_STATUS');
export const setOrders = createAction('SET_ORDERS');
export const setDataFilters = createAction('SET_DATA_FILTERS');
export const setPage = createAction('SET_PAGE');
export const setFilter = createAction('SET_FILTER');

// Запрос заказов
// Добавить обработку ошибки
const getOrders = () => async (dispatch, getState) => {
  const { limit, page } = getState().orders;
  const params = { limit, page };
  const responseOrders = await apiService.getOrders(params);
  const orders = responseOrders.data.data;
  dispatch(setOrders({ data: orders, total: responseOrders.data.count }));
};

const getDataFilters = () => async (dispatch) => {
  const dataFilters = { car: null, city: [], status: [] };
  const responseMap = ['car', 'city', 'status'];
  const requests = [apiService.getCars(), apiService.getCities(), apiService.getStatuses()];
  Promise.all(requests).then((responses) => {
    responses.forEach((r, i) => {
      dataFilters[responseMap[i]] = r.data.data;
    });
    dispatch(setDataFilters({ dataFilters }));
  });
};

export const initialOrdersRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [dispatch(getOrders()), dispatch(getDataFilters())];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => console.log(e));
};

const getOrdersRequest = () => async (dispatch, getState) => {
  const { limit, page, filters: { city, status, car } } = getState().orders;
  const params = {
    limit, page, city, status, car,
  };
  dispatch(setStatus({ status: 'updating' }));
  const responseOrders = await apiService.getOrders(params);
  const orders = responseOrders.data.data;
  dispatch(setOrders({ data: orders, total: responseOrders.data.count }));
  dispatch(setStatus({ status: 'received' }));
};

export const setPageOrders = (pageNumber) => async (dispatch) => {
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
