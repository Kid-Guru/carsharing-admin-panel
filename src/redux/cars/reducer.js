import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  filters: {
    category: null,
  },
  page: 0,
  limit: 10,
  total: null,
  status: 'initial',
  errors: [],
};

const handlers = {
  [actions.setCars]: (state, { payload: { data, total } }) => ({
    ...state,
    data,
    total,
  }),
  [actions.setPage]: (state, { payload: { page } }) => ({ ...state, page }),
  [actions.setFilter]: (state, { payload: { filters, page } }) => ({ ...state, page, filters }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupCars]: (state) => ({
    ...state,
    data: [],
    filters: {
      category: null,
    },
    page: 0,
    limit: 10,
    total: null,
    status: 'initial',
  }),
};

const carsReducer = handleActions(handlers, defaultState);

export default carsReducer;
