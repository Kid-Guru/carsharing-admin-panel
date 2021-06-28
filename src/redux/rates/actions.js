import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { showMessage } from '../messageBar/actions';
import { externalAllRateTypesRequest } from '../rateTypes/actions';

export const setRates = createAction('SET_RATES');
export const setStatus = createAction('SET_RATES_STATUS');
export const cleanupRates = createAction('CLEANUP_RATES');

const getRates = () => async (dispatch) => {
  try {
    const responseRates = await apiService.getRates();
    const rates = responseRates.data.data;
    dispatch(setRates({ data: rates }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

// eslint-disable-next-line arrow-body-style
export const externalAllRatesRequest = () => async (dispatch) => {
  return dispatch(getRates());
};

export const initialAllRatesRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));

  const responses = [
    dispatch(getRates()),
    dispatch(externalAllRateTypesRequest()),
  ];

  Promise.all(responses)
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const rateUpdate = (rateData, closeModalCallback) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { data: rateTypes } = getState().rateTypes;
  const selectedRateType = rateTypes.find((c) => c.id === rateData.rateType);
  const requestBody = {
    price: rateData.price,
    rateTypeId: selectedRateType,
  };
  try {
    await apiService.putRates(rateData.id, requestBody);
    await dispatch(getRates());
    dispatch(showMessage('Тариф успешно сохранен!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const rateDelete = (id, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteRates(id);
    await dispatch(getRates());
    dispatch(showMessage('Тариф успешно удален!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const ratePost = (rateData, closeCallback) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { data: rateTypes } = getState().rateTypes;
  const selectedRateType = rateTypes.find((c) => c.id === rateData.rateType);
  const requestBody = {
    price: rateData.price,
    rateTypeId: selectedRateType,
  };
  try {
    await apiService.postRates(requestBody);
    await dispatch(getRates());
    dispatch(showMessage('Тариф успешно сохранен!!', 'success'));
    closeCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
