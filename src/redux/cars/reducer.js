import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setCars]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  // [actions.cleanupCars]: (state) => ({
  //   ...state,
  //   data: [],
  //   status: 'fetching',
  // }),
};

const carsReducer = handleActions(handlers, defaultState);

export default carsReducer;
