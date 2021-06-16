import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCategories } from '../categories/actions';

export const setCars = createAction('SET_CARS');
export const setStatus = createAction('SET_CARS_STATUS');
export const setStatusExtraData = createAction('SET_CARS_STATUS_EXTRA_DATA');
export const setFilter = createAction('SET_CARS_FILTER');
export const cleanupCars = createAction('CLEANUP_CARS');

// Добавить обработку ошибки!!!
export const getAllCars = () => async (dispatch, getState) => {
  const statusCars = getState().cars.status;
  if (statusCars === 'receivedAll') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseCars = await apiService.getCars();
    const cars = responseCars.data.data;
    dispatch(setCars({ data: cars }));
    dispatch(setStatus({ status: 'receivedAll' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};

export const getFiltredCars = (filters) => async (dispatch) => {
  const params = { categoryId: filters.category };
  // dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseCars = await apiService.getCars(params);
    const cars = responseCars.data.data;
    dispatch(setCars({ data: cars }));
    dispatch(setStatus({ status: 'receivedWithFilter' }));
  } catch (e) {
    console.log(e);
    dispatch(setStatus({ status: 'error' }));
    // throw new Error('Ошибка получения данных');
  }
};

export const initialCarsRequest = () => async (dispatch) => {
  dispatch(setStatusExtraData({ status: 'fetching' }));
  const responses = [
    dispatch(getAllCars()),
    dispatch(getAllCategories()),
  ];

  Promise.all(responses)
    .then(() => dispatch(setStatusExtraData({ status: 'received' })))
    .catch((e) => {
      console.log(e);
      dispatch(setStatusExtraData({ status: 'error' }));
    });
};

export const cleanupIfNeed = () => async (dispatch, getState) => {
  const statusCars = getState().cars.status;
  if (statusCars === 'receivedWithFilter') {
    dispatch(setStatus({ status: 'fetching' }));
  }
};
