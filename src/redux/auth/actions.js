import { createAction } from 'redux-actions';
import { authLogin } from '../../api/api';
import cookieHelper from '../../helpers/cookieHelper';

export const setAuthStatus = createAction('SET_AUTH_STATUS');

export const login = (formData) => async (dispatch) => {
  const authData = {
    username: formData.login,
    password: formData.password,
  };
  const response = await authLogin(authData);

  cookieHelper.setAccessToken(response.data.access_token);
  cookieHelper.setRefreshToken(response.data.refresh_token);
  dispatch(setAuthStatus({ isAuth: true }));
};
