import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  status: 'checking',
};

const handlers = {
  [actions.setAuthStatus]: (state, { payload: { status } }) => ({ ...state, status }),
};

const authReducer = handleActions(handlers, defaultState);

export default authReducer;
