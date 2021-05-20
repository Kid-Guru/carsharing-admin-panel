import axios from 'axios';

const APPLICATION_ID = process.env.REACT_APP_X_API_APPLICATION_ID;
const SECRET = process.env.REACT_APP_X_API_SECRET;

export const URL = 'https://api-factory.simbirsoft1.com';
export const API_URL = 'https://api-factory.simbirsoft1.com/api';
export const AUTH_URL = {
  login: '/auth/login/oauth',
};

export const authInstance = axios.create({
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

export const APIInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Api-Factory-Application-Id': APPLICATION_ID,
  },
});

const orderApi = {
  getCity() {
    return APIInstance.get('db/city/');
  },
  getPoint() {
    return APIInstance.get('db/point/');
  },
  getCars() {
    return APIInstance.get('db/car/');
  },
  getCategories() {
    return APIInstance.get('db/category/');
  },
  getRates() {
    return APIInstance.get('db/rate');
  },
  getStatuses() {
    return APIInstance.get('db/orderStatus');
  },
  postOrder(requestBody) {
    return APIInstance.post('db/order', requestBody);
  },
  getOrder(id) {
    return APIInstance.get(`db/order/${id}`);
  },
  updateOrder(id, requestBody) {
    return APIInstance.put(`db/order/${id}`, requestBody);
  },
};

export { authLogin, orderApi };
