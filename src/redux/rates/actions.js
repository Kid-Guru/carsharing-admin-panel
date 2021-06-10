import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setRates = createAction('SET_RATES');
export const setStatus = createAction('SET_RATES_STATUS');
export const cleanupRates = createAction('CLEANUP_RATES');

// Добавить обработку ошибки
export const getAllRates = () => async (dispatch, getState) => {
  const statusRates = getState().rates.status;
  if (statusRates === 'received') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseRates = await apiService.getRates();
    const rates = responseRates.data.data;
    dispatch(setRates({ data: rates }));
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};
