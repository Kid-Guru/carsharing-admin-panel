import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setCities]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupCities]: (state) => ({
    ...state,
    data: [],
    status: 'fetching',
  }),
};

const citiesReducer = handleActions(handlers, defaultState);

export default citiesReducer;
