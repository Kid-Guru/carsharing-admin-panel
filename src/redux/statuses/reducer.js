import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setStatuses]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupStatuses]: (state) => ({
    ...state,
    data: [],
    status: 'fetching',
  }),
};

const statusesReducer = handleActions(handlers, defaultState);

export default statusesReducer;
