import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  filters: {
    category: null,
  },
  status: 'fetching',
  statusExtraData: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setCars]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.setStatusExtraData]: (state, { payload: { statusExtraData } }) => ({
    ...state,
    statusExtraData,
  }),
  [actions.setFilter]: (state, { payload: { filters } }) => ({ ...state, filters }),
  [actions.cleanupCars]: (state) => ({
    ...state,
    statusExtraData: 'fetching',
  }),
};

const carsReducer = handleActions(handlers, defaultState);

export default carsReducer;
