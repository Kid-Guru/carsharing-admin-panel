import queryString from 'query-string';
import { routes } from '../routes/apiRoutes';
import { authInstance, mainInstance } from './api';

const stringifyConfig = {
  skipNull: true,
};

const authService = {
  login(requestBody) {
    return authInstance.post(routes.LOGIN, requestBody);
  },
};

const apiService = {
  getOrders(filters) {
    const params = {
      limit: filters.limit,
      page: filters.page,
      cityId: filters.city,
      orderStatusId: filters.status,
      carId: filters.car,
    };
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.get(`${routes.ORDER}?${stringified}`);
  },
  getCities() {
    return mainInstance.get(`${routes.CITY}`);
  },
  getCars() {
    return mainInstance.get(`${routes.CAR}`);
  },
  getStatuses() {
    return mainInstance.get(`${routes.STATUS}`);
  },
  // getCategories() {
  //   return APIInstance.get('db/category/');
  // },
  // getRates() {
  //   return APIInstance.get('db/rate');
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
