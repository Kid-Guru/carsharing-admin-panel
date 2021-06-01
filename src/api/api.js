import axios from 'axios';
// import queryString from 'query-string';
import cookieHelper from '../helpers/cookieHelper';
import { API_URL, routes } from '../routes/apiRoutes';

const APPLICATION_ID = process.env.REACT_APP_X_API_APPLICATION_ID;
const SECRET = process.env.REACT_APP_X_API_SECRET;

const authInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
  },
});

authInstance.interceptors.request.use((config) => ({
  ...config,
  data: {
    ...config.data,
    client_secret: SECRET,
    client_id: '111111',
  },
}));

const updateToken = (requestBody) => authInstance.post(routes.REFRESH, requestBody);

const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
  },
});

mainInstance.interceptors.request.use(async (config) => ({
  ...config,
  data: {
    ...config.data,
    client_secret: SECRET,
  },
  headers: {
    ...config.headers,
    authorization: `Bearer ${cookieHelper.getAccessToken()}`,
  },
}));

/* eslint-disable no-underscore-dangle */
mainInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await updateToken({ refresh_token: cookieHelper.getRefreshToken() });
      // eslint-disable-next-line camelcase
      const { access_token, refresh_token, expires_in } = response.data;
      cookieHelper.setAccessRefreshTokens(access_token, refresh_token, expires_in);
      return mainInstance(originalRequest);
    }
    return Promise.reject(error);
  },
);

export { mainInstance, authInstance };
