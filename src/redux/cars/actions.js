import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCategories } from '../categories/actions';
import { showMessage } from '../messageBar/actions';

export const setCars = createAction('SET_CARS');
export const setStatus = createAction('SET_CARS_STATUS');
export const setFilter = createAction('SET_CARS_FILTER');
export const cleanupCars = createAction('CLEANUP_CARS');

const getCars = () => async (dispatch, getState) => {
  const { category } = getState().cars.filters;
  const filters = { categoryId: category };
  try {
    const responseCars = await apiService.getCars(filters);
    const cars = responseCars.data.data;
    dispatch(setCars({ data: cars }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

/// fixme
export const externalAllCarsRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(setFilter({ filters: { category: null } }));
  return dispatch(getCars());
};

export const initialAllCarsRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(setFilter({ filters: { category: null } }));
  const responses = [dispatch(getCars()), dispatch(getAllCategories())];

  Promise.all(responses)
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const setFilterCars = (filters) => async (dispatch) => {
  dispatch(setFilter({ filters }));
  dispatch(setStatus({ status: 'fetching' }));
  try {
    await dispatch(getCars());
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(showMessage(e.message, 'alert'));
  }
};
