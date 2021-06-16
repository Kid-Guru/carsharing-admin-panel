import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  // statusExtraData: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setCategories]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  // [actions.cleanupCategories]: (state) => ({
  //   ...state,
  //   data: [],
  //   status: 'fetching',
  // }),
};

const categoriesReducer = handleActions(handlers, defaultState);

export default categoriesReducer;
