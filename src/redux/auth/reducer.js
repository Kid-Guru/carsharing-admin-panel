import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  isAuth: false,
  status: 'checking',
  errors: [],
};

const handlers = {
  [actions.setAuthFlag]: (state, { payload: { isAuth } }) => ({ ...state, isAuth }),
  [actions.setAuthStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  // [actions.setAuthErrors]: (state, { payload: { errors } }) => ({ ...state, errors }),
};

const authReducer = handleActions(handlers, defaultState);

export default authReducer;
