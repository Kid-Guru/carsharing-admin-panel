import { createAction } from 'redux-actions';
import { authLogin } from '../../api/api';
import cookieHelper from '../../helpers/cookieHelper';

export const setAuthStatus = createAction('SET_AUTH_STATUS');
export const setAuthErrors = createAction('SET_AUTH_ERRORS');

export const login = (formData, setErrorsForm, setSubmitting) => async (dispatch) => {
  const formErrors = {
    login: 'Неверный логин или пароль',
    password: 'Неверный логин или пароль',
  };
  const authData = {
    username: formData.login,
    password: formData.password,
  };
  let response;
  try {
    response = await authLogin(authData);

    cookieHelper.setAccessToken(response.data.access_token);
    cookieHelper.setRefreshToken(response.data.refresh_token);
    dispatch(setAuthStatus({ isAuth: true }));
  } catch (e) {
    setErrorsForm(formErrors);
    setSubmitting(false);
  }
};

export const logout = () => async (dispatch) => {
  cookieHelper.removeAccessToken();
  cookieHelper.removeRefreshToken();
  dispatch(setAuthStatus({ isAuth: false }));
};
