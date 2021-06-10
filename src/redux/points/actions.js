import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setPoints = createAction('SET_POINTS');
export const setStatus = createAction('SET_POINTS_STATUS');
export const cleanupPoints = createAction('CLEANUP_POINTS');

// Добавить обработку ошибки
export const getAllPoints = () => async (dispatch, getState) => {
  const statusPoints = getState().points.status;
  if (statusPoints === 'received') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responsePoints = await apiService.getPoints();
    const points = responsePoints.data.data;
    dispatch(setPoints({ data: points }));
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};
