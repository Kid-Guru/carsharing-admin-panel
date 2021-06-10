import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import ordersReducer from './orders/reducer';
import orderEditReducer from './orderEdit/reducer';
import carsReducer from './cars/reducer';
import citiesReducer from './cities/reducer';
import pointsReducer from './points/reducer';
import statusesReducer from './statuses/reducer';
import ratesReducer from './rates/reducer';

export default combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  order: orderEditReducer,
  cars: carsReducer,
  cities: citiesReducer,
  points: pointsReducer,
  statuses: statusesReducer,
  rates: ratesReducer,
});
