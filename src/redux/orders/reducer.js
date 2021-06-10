import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  filters: {
    car: null,
    city: null,
    status: null,
  },
  page: 0,
  limit: 10,
  total: null,
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setOrders]: (state, { payload: { data, total } }) => ({
    ...state,
    data,
    total,
  }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.setPage]: (state, { payload: { page } }) => ({ ...state, page }),
  [actions.setFilter]: (state, { payload: { filters } }) => ({ ...state, filters }),
  [actions.cleanupOrders]: (state) => ({
    ...state,
    filters: {
      car: null,
      city: null,
      status: null,
    },
    page: 0,
    total: null,
    status: 'fetching',
  }),
};

const ordersReducer = handleActions(handlers, defaultState);

export default ordersReducer;
