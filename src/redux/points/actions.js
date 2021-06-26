import { createAction } from 'redux-actions';
import { showMessage } from '../messageBar/actions';
import { externalAllCitiesRequest } from '../cities/actions';
import { apiService } from '../../api/service';

export const setPoints = createAction('SET_POINTS');
export const setStatus = createAction('SET_POINTS_STATUS');
export const cleanupPoints = createAction('CLEANUP_POINTS');

const getPoints = () => async (dispatch) => {
  try {
    const responsePoints = await apiService.getPoints();
    const points = responsePoints.data.data;
    dispatch(setPoints({ data: points }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

// eslint-disable-next-line arrow-body-style
export const externalAllPointsRequest = () => async (dispatch) => {
  return dispatch(getPoints());
};

export const initialAllPointsRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));

  const responses = [dispatch(getPoints()), dispatch(externalAllCitiesRequest())];

  Promise.all(responses)
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const pointUpdate = (pointData, closeModalCallback) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { data: cities } = getState().cities;
  const selectedCity = cities.find((c) => c.id === pointData.city);
  const requestBody = {
    id: pointData.id,
    name: pointData.pointName,
    address: pointData.pointAddress,
    cityId: {
      name: selectedCity.name,
      id: selectedCity.id,
    },
  };
  try {
    await apiService.putPoints(pointData.id, requestBody);
    await dispatch(getPoints());
    dispatch(showMessage('Точка успешно сохранена!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const pointDelete = (id, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deletePoints(id);
    await dispatch(getPoints());
    dispatch(showMessage('Точка успешно удалена!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const pointPost = (pointData, closeCallback) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { data: cities } = getState().cities;
  const selectedCity = cities.find((c) => c.id === pointData.city);
  const requestBody = {
    id: pointData.id,
    name: pointData.pointName,
    address: pointData.pointAddress,
    cityId: {
      name: selectedCity.name,
      id: selectedCity.id,
    },
  };
  try {
    await apiService.postPoints(requestBody);
    await dispatch(getPoints());
    dispatch(showMessage('Точка успешно сохранена!!', 'success'));
    closeCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
