import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import ordersReducer from './orders/reducer';
import orderEditReducer from './orderEdit/reducer';

export default combineReducers({
  auth: authReducer,
  orders: ordersReducer,
  order: orderEditReducer,
});
