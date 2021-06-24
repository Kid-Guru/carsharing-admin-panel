import { createAction } from 'redux-actions';

export const setMessage = createAction('SET_MESSAGE');
export const setMessageText = createAction('SET_MESSAGE_TEXT');
export const setVisibilityMessageBar = createAction('SET_VISIBILITY_MESSAGE_BAR');

export const showMessage = (text, type) => async (dispatch) => {
  dispatch(setMessage({ text, type, isShowing: true }));
  setTimeout(() => dispatch(setVisibilityMessageBar({ isShowing: false })), 3500);
};
