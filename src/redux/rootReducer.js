import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import ordersReducer from './orders/reducer';
import orderEditReducer from './orderEdit/reducer';
import carsReducer from './cars/reducer';
import carEditReducer from './carEdit/reducer';
import categoriesReducer from './categories/reducer';
import citiesReducer from './cities/reducer';
import pointsReducer from './points/reducer';
import statusesReducer from './statuses/reducer';
import ratesReducer from './rates/reducer';

export default combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  order: orderEditReducer,
  cars: carsReducer,
  car: carEditReducer,
  categories: categoriesReducer,
  cities: citiesReducer,
  points: pointsReducer,
  statuses: statusesReducer,
  rates: ratesReducer,
});
