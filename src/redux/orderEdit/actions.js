import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setStatus = createAction('SET_ORDER_STATUS');
export const setOrder = createAction('SET_ORDER');
export const setExtraData = createAction('SET_EXTRA_DATA');
// export const setPage = createAction('SET_PAGE');
// export const setFilter = createAction('SET_FILTER');
// export const cleanupOrders = createAction('CLEANUP_ORDERS');
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
    cars: [], cities: [], points: [], rates: [], statuses: [],
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

// const getOrdersRequest = () => async (dispatch, getState) => {
//   const { limit, page, filters: { city, status, car } } = getState().orders;
//   const params = {
//     limit, page, city, status, car,
//   };
//   dispatch(setStatus({ status: 'updating' }));
//   const responseOrders = await apiService.getOrders(params);
//   const orders = responseOrders.data.data;
//   dispatch(setOrders({ data: orders, total: responseOrders.data.count }));
//   dispatch(setStatus({ status: 'received' }));
// };

// export const setPageOrders = (pageNumber) => async (dispatch) => {
//   dispatch(setPage({ page: pageNumber }));
//   dispatch(getOrdersRequest());
// };

// export const setFilterOrders = (newFilter) => async (dispatch) => {
//   const filters = {
//     car: newFilter.model,
//     city: newFilter.city,
//     status: newFilter.status,
//   };
//   dispatch(setFilter({ filters }));
//   dispatch(getOrdersRequest());
// };
