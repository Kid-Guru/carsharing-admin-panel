import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setRates]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupRates]: (state) => ({
    ...state,
    data: [],
    status: 'fetching',
  }),
};

const ratesReducer = handleActions(handlers, defaultState);

export default ratesReducer;
