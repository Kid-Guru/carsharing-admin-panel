import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setCars = createAction('SET_CARS');
export const setStatus = createAction('SET_CARS_STATUS');
// export const cleanupCars = createAction('CLEANUP_CARS');

// Добавить обработку ошибки!!!
export const getAllCars = () => async (dispatch, getState) => {
  const statusCars = getState().cars.status;
  if (statusCars === 'received') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseCars = await apiService.getCars();
    const cars = responseCars.data.data;
    dispatch(setCars({ data: cars }));
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};
