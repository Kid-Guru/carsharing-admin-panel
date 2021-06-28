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
  putPoints(id, body) {
    return mainInstance.put(`${routes.POINT}/${id}`, body);
  },
  postPoints(body) {
    return mainInstance.post(`${routes.POINT}`, body);
  },
  deletePoints(id) {
    return mainInstance.delete(`${routes.POINT}/${id}`);
  },
  getRates() {
    return mainInstance.get(`${routes.RATE}`);
  },
  putRates(id, body) {
    return mainInstance.put(`${routes.RATE}/${id}`, body);
  },
  postRates(body) {
    return mainInstance.post(`${routes.RATE}`, body);
  },
  deleteRates(id) {
    return mainInstance.delete(`${routes.RATE}/${id}`);
  },
  getRateTypes() {
    return mainInstance.get(`${routes.RATETYPE}`);
  },
  putRateTypes(id, body) {
    return mainInstance.put(`${routes.RATETYPE}/${id}`, body);
  },
  postRateTypes(body) {
    return mainInstance.post(`${routes.RATETYPE}`, body);
  },
  deleteRateTypes(id) {
    return mainInstance.delete(`${routes.RATETYPE}/${id}`);
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
  getCategories() {
    return mainInstance.get(`${routes.CATEGORY}`);
  },
  putCategories(id, body) {
    return mainInstance.put(`${routes.CATEGORY}/${id}`, body);
  },
  postCategories(body) {
    return mainInstance.post(`${routes.CATEGORY}`, body);
  },
  deleteCategories(id) {
    return mainInstance.delete(`${routes.CATEGORY}/${id}`);
  },
  getStatuses() {
    return mainInstance.get(`${routes.STATUS}`);
  },
  putStatuses(id, body) {
    return mainInstance.put(`${routes.STATUS}/${id}`, body);
  },
  postStatuses(body) {
    return mainInstance.post(`${routes.STATUS}`, body);
  },
  deleteStatuses(id) {
    return mainInstance.delete(`${routes.STATUS}/${id}`);
  },
};

export { authService, apiService };
