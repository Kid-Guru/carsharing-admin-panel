import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCategories } from '../categories/actions';
import { categoryByIdSelector } from '../categories/selectors';

export const setStatus = createAction('SET_CAR_STATUS');
export const setCar = createAction('SET_CAR');
export const cleanupCar = createAction('CLEANUP_CAR');

// Добавить обработку ошибки
const getCar = (id) => async (dispatch) => {
  const params = { id };
  const responseCar = await apiService.getCars(params);
  const car = responseCar.data.data?.[0];
  dispatch(setCar({ data: car }));
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
      console.log(e);
      dispatch(setStatus({ status: 'error' }));
    });
};

export const prepareData = () => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  const responses = [
    // dispatch(getCar(id)),
    dispatch(getAllCategories()),
  ];

  Promise.all(responses)
    .then(() => dispatch(setStatus({ status: 'received' })))
    .catch((e) => {
      console.log(e);
      dispatch(setStatus({ status: 'error' }));
    });
};

export const carDelete = (id) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteCars(id);
    dispatch(setStatus({ status: 'transferSeccuess' }));
  } catch (e) {
    if (e.response.status >= 200) {
      dispatch(setStatus({ status: 'transferError' }));
    } else {
      throw e;
    }
  }
};

export const carPost = (carData) => async (dispatch, getState) => {
  dispatch(setStatus({ status: 'transfering' }));
  // const { id } = getState().car.data;
  const requestBody = {
    // id,
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
  } catch (e) {
    if (e.response.status >= 200) {
      dispatch(setStatus({ status: 'transferError' }));
    } else {
      throw e;
    }
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
  } catch (e) {
    if (e.response.status >= 200) {
      dispatch(setStatus({ status: 'transferError' }));
    } else {
      throw e;
    }
  }
};
