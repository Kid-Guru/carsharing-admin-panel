import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: {},
  status: 'fetching',
  extraData: {
    cars: [],
    cities: [],
    points: [],
    rates: [],
    statuses: [],
  },
  errors: [],
};

const handlers = {
  [actions.setOrder]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setExtraData]: (state, { payload: { extraData } }) => ({ ...state, extraData }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupOrder]: (state) => ({
    ...state,
    status: 'fetching',
    extraData: {
      cars: [],
      cities: [],
      points: [],
      rates: [],
      statuses: [],
    },
  }),
  // [actions.setPage]: (state, { payload: { page } }) => ({ ...state, page }),
  // [actions.setFilter]: (state, { payload: { filters } }) => ({ ...state, filters }),
  // [actions.cleanupOrders]: (state) => ({
  //   ...state,
  //   filters: {
  //     car: null,
  //     city: null,
  //     status: null,
  //   },
  // }),
};

const orderReducer = handleActions(handlers, defaultState);

export default orderReducer;
