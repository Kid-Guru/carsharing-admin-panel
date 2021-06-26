import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setRateTypes]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupRateTypes]: (state) => ({
    ...state,
    data: [],
    status: 'fetching',
  }),
};

const rateTypesReducer = handleActions(handlers, defaultState);

export default rateTypesReducer;
