import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: {},
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setOrder]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupOrder]: (state) => ({
    ...state,
    status: 'fetching',
  }),
};

const orderReducer = handleActions(handlers, defaultState);

export default orderReducer;
