import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { showMessage } from '../messageBar/actions';

export const setStatuses = createAction('SET_STATUSES');
export const setStatus = createAction('SET_STATUSES_STATUS');
export const cleanupStatuses = createAction('CLEANUP_STATUSES');

const getStatuses = () => async (dispatch) => {
  try {
    const responseStatuses = await apiService.getStatuses();
    const statuses = responseStatuses.data.data;
    dispatch(setStatuses({ data: statuses }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

// eslint-disable-next-line arrow-body-style
export const externalAllStatusesRequest = () => async (dispatch) => {
  return dispatch(getStatuses());
};

export const initialAllStatusesRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(getStatuses())
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const statusUpdate = (statusData, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    name: statusData.name,
    id: statusData.id,
  };
  try {
    await apiService.putStatuses(statusData.id, requestBody);
    await dispatch(getStatuses());
    dispatch(showMessage('Статус успешно сохранен!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const statusDelete = (id, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteStatuses(id);
    await dispatch(getStatuses());
    dispatch(showMessage('Статус успешно удален!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const statusPost = (statusData, closeCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    name: statusData.name,
  };
  try {
    await apiService.postStatuses(requestBody);
    await dispatch(getStatuses());
    dispatch(showMessage('Статус успешно сохранен!!', 'success'));
    closeCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
