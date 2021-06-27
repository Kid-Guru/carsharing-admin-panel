import { createAction } from 'redux-actions';
import { showMessage } from '../messageBar/actions';
import { apiService } from '../../api/service';

export const setRateTypes = createAction('SET_RATETYPES');
export const setStatus = createAction('SET_RATETYPES_STATUS');
export const cleanupRateTypes = createAction('CLEANUP_RATETYPES');

const getRateTypes = () => async (dispatch) => {
  try {
    const responseRateTypes = await apiService.getRateTypes();
    const rateTypes = responseRateTypes.data.data;
    dispatch(setRateTypes({ data: rateTypes }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

// eslint-disable-next-line arrow-body-style
export const externalAllRateTypesRequest = () => async (dispatch) => {
  return dispatch(getRateTypes());
};

export const initialAllRateTypesRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(getRateTypes())
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const rateTypeUpdate = (rateTypeData, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    name: rateTypeData.rateTypeName,
    unit: rateTypeData.unit,
    id: rateTypeData.id,
  };
  try {
    await apiService.putRateTypes(rateTypeData.id, requestBody);
    await dispatch(getRateTypes());
    dispatch(showMessage('Тариф успешно сохранен!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const rateTypeDelete = (id, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteRateTypes(id);
    await dispatch(getRateTypes());
    dispatch(showMessage('Тариф успешно удален!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const rateTypePost = (rateTypeData, closeCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    name: rateTypeData.rateTypeName,
    unit: rateTypeData.unit,
  };
  try {
    await apiService.postRateTypes(requestBody);
    await dispatch(getRateTypes());
    dispatch(showMessage('Тариф успешно сохранен!!', 'success'));
    closeCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
