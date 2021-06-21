import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: {},
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setCar]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupCar]: (state) => ({
    ...state,
    status: 'fetching',
  }),
};

const carReducer = handleActions(handlers, defaultState);

export default carReducer;
