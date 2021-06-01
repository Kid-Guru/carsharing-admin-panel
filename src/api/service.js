import queryString from 'query-string';
import { routes } from '../routes/apiRoutes';
import { authInstance, mainInstance } from './api';

const authService = {
  login(requestBody) {
    return authInstance.post(routes.LOGIN, requestBody);
  },
};

const apiService = {
  getOrders(params) {
    const stringified = queryString.stringify(params);
    return mainInstance.get(`${routes.ORDER}?${stringified}`);
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

export { authService, apiService };
