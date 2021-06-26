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
      limit: filters?.limit,
      page: filters?.page,
      cityId: filters?.city,
      orderStatusId: filters?.status,
      carId: filters?.car,
      id: filters?.id,
    };
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.get(`${routes.ORDER}?${stringified}`);
  },
  putOrders(id, body) {
    const params = {};
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.put(`${routes.ORDER}/${id}?${stringified}`, body);
  },
  getCities() {
    return mainInstance.get(`${routes.CITY}`);
  },
  putCities(id, body) {
    return mainInstance.put(`${routes.CITY}/${id}`, body);
  },
  postCities(body) {
    return mainInstance.post(`${routes.CITY}`, body);
  },
  deleteCities(id) {
    return mainInstance.delete(`${routes.CITY}/${id}`);
  },
  getPoints() {
    return mainInstance.get(`${routes.POINT}`);
  },
  getRates() {
    return mainInstance.get(`${routes.RATE}`);
  },
  getCars(filters) {
    const params = {
      categoryId: filters?.categoryId,
      id: filters?.id,
    };
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.get(`${routes.CAR}?${stringified}`);
  },
  postCars(body) {
    const params = {};
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.post(`${routes.CAR}?${stringified}`, body);
  },
  putCars(id, body) {
    const params = {};
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.put(`${routes.CAR}/${id}?${stringified}`, body);
  },
  deleteCars(id) {
    const params = {};
    const stringified = queryString.stringify(params, stringifyConfig);
    return mainInstance.delete(`${routes.CAR}/${id}?${stringified}`);
  },
  getStatuses() {
    return mainInstance.get(`${routes.STATUS}`);
  },
  getCategories() {
    return mainInstance.get(`${routes.CATEGORY}`);
  },
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
