import axios from 'axios';
import queryString from 'query-string';
import cookieHelper from '../helpers/cookieHelper';

const APPLICATION_ID = process.env.REACT_APP_X_API_APPLICATION_ID;
const SECRET = process.env.REACT_APP_X_API_SECRET;

const URL = 'https://api-factory.simbirsoft1.com';
const API_URL = 'https://api-factory.simbirsoft1.com/api';
const AUTH_URL = {
  // login: '/auth/login/oauth',
  login: '/auth/login',
};

const authInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
  },
});

authInstance.interceptors.request.use(
  (config) => ({
    ...config,
    data: {
      ...config.data,
      client_secret: SECRET,
      client_id: '111111',
    },
  }),
);

const authLogin = (requestBody) => authInstance.post(AUTH_URL.login, requestBody);




const mainInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
  },
});

mainInstance.interceptors.request.use(
  (config) => ({
    ...config,
    data: {
      ...config.data,
      client_secret: SECRET,
    },
    headers: {
      ...config.headers,
      authorization: `Bearer ${cookieHelper.getAccessToken()}`,
    },
  }),
);

const api = {
  getOrders(params) {
    const stringified = queryString.stringify(params);
    return mainInstance.get(`db/order?${stringified}`);
  },
  // getPoint() {
  //   return APIInstance.get('db/point/');
  // },
  // getCars() {
  //   return APIInstance.get('db/car/');
  // },
  // getCategories() {
  //   return APIInstance.get('db/category/');
  // },
  // getRates() {
  //   return APIInstance.get('db/rate');
  // },
  // getStatuses() {
  //   return APIInstance.get('db/orderStatus');
  // },
  // postOrder(requestBody) {
  //   return APIInstance.post('db/order', requestBody);
  // },
  // getOrder(id) {
  //   return APIInstance.get(`db/order/${id}`);
  // },
  // updateOrder(id, requestBody) {
  //   return APIInstance.put(`db/order/${id}`, requestBody);
  // },
};

export { authLogin, api, URL };
