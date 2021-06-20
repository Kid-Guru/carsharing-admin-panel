import { createAction } from 'redux-actions';
import { authService } from '../../api/service';
import cookieHelper from '../../helpers/cookieHelper';

export const setAuthStatus = createAction('SET_AUTH_STATUS');

export const checkTokens = () => (dispatch) => {
  if (cookieHelper.getAccessToken() || cookieHelper.getRefreshToken()) {
    dispatch(setAuthStatus({ status: 'authorized' }));
  } else {
    dispatch(setAuthStatus({ status: 'notAuthorized' }));
  }
};

export const login = (formData, setErrorsForm, setSubmitting) => async (dispatch) => {
  try {
    const response = await authService.login({
      username: formData.login,
      password: formData.password,
    });
    // eslint-disable-next-line camelcase
    const { access_token, refresh_token, expires_in } = response.data;
    cookieHelper.setAccessRefreshTokens(access_token, refresh_token, expires_in);
    dispatch(setAuthStatus({ status: 'authorized' }));
  } catch (e) {
    if (e.response?.status === 401) {
      setErrorsForm({
        login: 'Неверный логин или пароль',
        password: 'Неверный логин или пароль',
      });
    }
    setSubmitting(false);
  }
};

export const logout = () => async (dispatch) => {
  cookieHelper.removeAccessToken();
  cookieHelper.removeRefreshToken();
  dispatch(setAuthStatus({ status: 'notAuthorized' }));
};
