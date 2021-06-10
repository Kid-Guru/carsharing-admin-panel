import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  data: [],
  status: 'fetching',
  errors: [],
};

const handlers = {
  [actions.setPoints]: (state, { payload: { data } }) => ({ ...state, data }),
  [actions.setStatus]: (state, { payload: { status } }) => ({ ...state, status }),
  [actions.cleanupPoints]: (state) => ({
    ...state,
    data: [],
    status: 'fetching',
  }),
};

const pointsReducer = handleActions(handlers, defaultState);

export default pointsReducer;
