import { handleActions } from 'redux-actions';
import * as actions from './actions';

const defaultState = {
  isShowing: false,
  text: '',
  type: '',
};

const handlers = {
  [actions.setMessage]: (state, { payload: { isShowing, text, type } }) => ({
    ...state,
    isShowing,
    text,
    type,
  }),
  [actions.setMessageText]: (state, { payload: { text } }) => ({ ...state, text }),
  [actions.setVisibilityMessageBar]: (state, { payload: { isShowing } }) => ({
    ...state, isShowing,
  }),
};

const carsReducer = handleActions(handlers, defaultState);

export default carsReducer;
