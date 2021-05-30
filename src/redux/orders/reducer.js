import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  filters: {},
  page: 1,
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
};

const ordersReducer = handleActions(handlers, defaultState);

export default ordersReducer;
