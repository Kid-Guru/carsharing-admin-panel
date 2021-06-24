import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCategories } from '../categories/actions';
import { categoryByIdSelector } from '../categories/selectors';
import { showMessage } from '../messageBar/actions';

export const setStatus = createAction('SET_CAR_STATUS');
export const setCar = createAction('SET_CAR');
export const cleanupCar = createAction('CLEANUP_CAR');

const getCar = (id) => async (dispatch) => {
  const params = { id };
  try {
    const responseCar = await apiService.getCars(params);
    const cars = responseCar.data.data;
    if (cars.length === 0) {
      throw new Error(`Машина с id ${id} не найдена`);
    }
    dispatch(setCar({ data: cars[0] }));
  } catch (e) {
    if (e.response || e.request) {
      throw new Error('Произошла ошибка получения данных. Попробуйте еще');
    }
    throw e;
  }
};

export const carRequest = (id) => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [
    dispatch(getCar(id)),
    dispatch(getAllCategories()),
  ];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const prepareData = () => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));

  dispatch(getAllCategories())
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const carDelete = (id) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteCars(id);
    dispatch(setStatus({ status: 'transferSeccuess' }));
    dispatch(showMessage('Машина успешно удалена!!', 'success'));
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const carPost = (carData) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    description: carData.description,
    categoryId: categoryByIdSelector(getState(), carData.category),
    colors: carData.availableColors,
    priceMax: carData.maxPrice,
    priceMin: carData.minPrice,
    name: carData.model,
    tank: carData.fuelLevel,
    number: carData.number,
    thumbnail: carData.thumbnail,
  };
  try {
    await apiService.postCars(requestBody);
    dispatch(setStatus({ status: 'transferSeccuess' }));
    dispatch(showMessage('Машина успешно сохранена!!', 'success'));
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const carUpdate = (carData) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  const { id } = getState().car.data;
  const requestBody = {
    id,
    description: carData.description,
    categoryId: categoryByIdSelector(getState(), carData.category),
    colors: carData.availableColors,
    priceMax: carData.maxPrice,
    priceMin: carData.minPrice,
    name: carData.model,
    tank: carData.fuelLevel,
    number: carData.number,
    thumbnail: carData.thumbnail,
  };
  try {
    await apiService.putCars(id, requestBody);
    dispatch(setStatus({ status: 'transferSeccuess' }));
    dispatch(showMessage('Машина успешно сохранена!!', 'success'));
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
