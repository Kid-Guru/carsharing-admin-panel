import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { externalAllCategoriesRequest } from '../categories/actions';
import { showMessage } from '../messageBar/actions';

export const setCars = createAction('SET_CARS');
export const setStatus = createAction('SET_CARS_STATUS');
export const setPage = createAction('SET_CARS_PAGE');
export const setFilter = createAction('SET_CARS_FILTER');
export const cleanupCars = createAction('CLEANUP_CARS');

const getCars = () => async (dispatch, getState) => {
  const { page, limit, filters: { category } } = getState().cars;
  const filters = { categoryId: category, page, limit };
  try {
    const responseCars = await apiService.getCars(filters);
    const cars = responseCars.data.data;
    dispatch(setCars({ data: cars, total: responseCars.data.count }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

export const initialAllCarsRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(setFilter({ filters: { category: null, page: 0 } }));
  const responses = [dispatch(getCars()), dispatch(externalAllCategoriesRequest())];

  Promise.all(responses)
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const setPageCars = (pageNumber) => async (dispatch, getState) => {
  const currentPage = getState().cars.page;
  if (currentPage === pageNumber) return;
  dispatch(setPage({ page: pageNumber }));
  dispatch(setStatus({ status: 'fetching' }));
  try {
    await dispatch(getCars());
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(showMessage(e.message, 'alert'));
  }
};

export const setFilterCars = (filters) => async (dispatch) => {
  dispatch(setFilter({ filters, page: 0 }));
  dispatch(setStatus({ status: 'fetching' }));
  try {
    await dispatch(getCars());
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(showMessage(e.message, 'alert'));
  }
};
