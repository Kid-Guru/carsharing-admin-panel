import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  filters: {
    category: null,
  },
  status: 'initial',
  errors: [],
};

const handlers = {
  [actions.setCars]: (state, { payload: { data } }) => ({
    ...state,
    data,
  }),
  [actions.setFilter]: (state, { payload: { filters } }) => ({ ...state, filters }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupCars]: (state) => ({
    ...state,
    data: [],
    filters: {
      category: null,
    },
    status: 'initial',
  }),
};

const carsReducer = handleActions(handlers, defaultState);

export default carsReducer;
