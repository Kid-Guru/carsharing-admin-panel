import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  filters: {
    city: null,
    status: null,
  },
  page: 0,
  limit: 10,
  total: null,
  status: 'initial',
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
  [actions.setFilter]: (state, { payload: { filters, page } }) => ({ ...state, page, filters }),
  [actions.cleanupOrders]: (state) => ({
    ...state,
    filters: {
      car: null,
      city: null,
      status: null,
    },
    page: 0,
    total: null,
    status: 'initial',
  }),
};

const ordersReducer = handleActions(handlers, defaultState);

export default ordersReducer;
