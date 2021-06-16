import { createAction } from 'redux-actions';
import { authService } from '../../api/service';
import cookieHelper from '../../helpers/cookieHelper';

export const setAuthFlag = createAction('SET_AUTH_FLAG');
export const setAuthStatus = createAction('SET_AUTH_STATUS');
// export const setAuthErrors = createAction('SET_AUTH_ERRORS');

export const checkTokens = () => (dispatch) => {
  if (cookieHelper.getAccessToken() || cookieHelper.getRefreshToken()) {
    dispatch(setAuthStatus({ status: 'authorized' }));
  } else {
    dispatch(setAuthStatus({ status: 'notAuthorized' }));
  }
};

export const login = (formData, setErrorsForm, setSubmitting) => async (dispatch) => {
  const formErrors = {
    login: 'Неверный логин или пароль',
    password: 'Неверный логин или пароль',
  };
  const authData = {
    username: formData.login,
    password: formData.password,
  };
  try {
    const response = await authService.login(authData);
    // eslint-disable-next-line camelcase
    const { access_token, refresh_token, expires_in } = response.data;
    cookieHelper.setAccessRefreshTokens(access_token, refresh_token, expires_in);
    dispatch(setAuthStatus({ status: 'authorized' }));
  } catch (e) {
    if (e.response.status === 401) {
      setErrorsForm(formErrors);
      setSubmitting(false);
    } else {
      throw e;
    }
  }
};

export const logout = () => async (dispatch) => {
  cookieHelper.removeAccessToken();
  cookieHelper.removeRefreshToken();
  dispatch(setAuthStatus({ status: 'notAuthorized' }));
};