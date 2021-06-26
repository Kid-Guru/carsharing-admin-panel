import { createAction } from 'redux-actions';
import { showMessage } from '../messageBar/actions';
import { apiService } from '../../api/service';

export const setCities = createAction('SET_CITIES');
export const setStatus = createAction('SET_CITIES_STATUS');
export const cleanupCities = createAction('CLEANUP_CITIES');

const getCities = () => async (dispatch) => {
  try {
    const responseCities = await apiService.getCities();
    const cities = responseCities.data.data;
    dispatch(setCities({ data: cities }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

// eslint-disable-next-line arrow-body-style
export const externalAllCitiesRequest = () => async (dispatch) => {
  return dispatch(getCities());
};

export const initialAllCitiesRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(getCities())
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const cityUpdate = (cityData, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    id: cityData.id,
    name: cityData.cityName,
  };
  try {
    await apiService.putCities(cityData.id, requestBody);
    await dispatch(getCities());
    dispatch(showMessage('Город успешно сохранен!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const cityDelete = (id, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteCities(id);
    await dispatch(getCities());
    dispatch(showMessage('Город успешно удален!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const cityPost = (cityData, closeCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = { name: cityData.cityName };
  try {
    await apiService.postCities(requestBody);
    await dispatch(getCities());
    dispatch(showMessage('Город успешно сохранен!!', 'success'));
    closeCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
