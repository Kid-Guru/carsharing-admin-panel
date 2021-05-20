import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  isAuth: false,
  // status: 'fetching',
  // errors: [],
};

const handlers = {
  [actions.setAuthStatus]: (state, { payload: { isAuth } }) => ({ ...state, isAuth }),
};

const authReducer = handleActions(handlers, defaultState);

export default authReducer;
