import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setCities = createAction('SET_CITIES');
export const setStatus = createAction('SET_CITIES_STATUS');
export const cleanupCities = createAction('CLEANUP_CITIES');

// Добавить обработку ошибки
export const getAllCities = () => async (dispatch, getState) => {
  const statusCities = getState().cities.status;
  if (statusCities === 'received') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseCities = await apiService.getCities();
    const cities = responseCities.data.data;
    dispatch(setCities({ data: cities }));
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};
