import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setStatuses = createAction('SET_STATUSES');
export const setStatus = createAction('SET_STATUSES_STATUS');
export const cleanupStatuses = createAction('CLEANUP_STATUSES');

// Добавить обработку ошибки
export const getAllStatuses = () => async (dispatch, getState) => {
  const statusStatuses = getState().statuses.status;
  if (statusStatuses === 'received') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseStatuses = await apiService.getStatuses();
    const statuses = responseStatuses.data.data;
    dispatch(setStatuses({ data: statuses }));
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};
