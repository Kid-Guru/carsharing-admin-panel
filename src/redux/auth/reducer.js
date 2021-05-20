import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  isAuth: false,
  // status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setAuthStatus]: (state, { payload: { isAuth } }) => ({ ...state, isAuth }),
  [actions.setAuthErrors]: (state, { payload: { errors } }) => ({ ...state, errors }),
};

const authReducer = handleActions(handlers, defaultState);

export default authReducer;
