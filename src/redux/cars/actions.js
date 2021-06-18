import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { getAllCategories } from '../categories/actions';

export const setCars = createAction('SET_CARS');
export const setStatus = createAction('SET_CARS_STATUS');
export const setFilter = createAction('SET_CARS_FILTER');
export const cleanupCars = createAction('CLEANUP_CARS');

// const getAllCars = () => async (dispatch) => {
//   try {
//     const responseCars = await apiService.getCars();
//     const cars = responseCars.data.data;
//     dispatch(
//       setCars({
//         data: cars,
//         status: 'received',
//       }),
//     );
//   } catch (e) {
//     dispatch(setStatus({ status: 'error' }));
//     throw new Error('Ошибка получения данных');
//   }
// };

const getCars = () => async (dispatch, getState) => {
  const { category } = getState().cars.filters;
  const filters = { categoryId: category };
  try {
    const responseCars = await apiService.getCars(filters);
    const cars = responseCars.data.data;
    dispatch(setCars({ data: cars, status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};

export const externalAllCarsRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  // dispatch(setFilter({ filters: { category: null } }));
  dispatch(getCars());
};

export const initialAllCarsRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  // dispatch(setFilter({ filters: { category: null } }));
  const responses = [dispatch(getCars()), dispatch(getAllCategories())];

  Promise.all(responses)
    .then()
    .catch((e) => {
      console.log(e);
    });
};

export const setFilterCars = (filters) => async (dispatch) => {
  dispatch(setStatus({ status: 'fetching' }));
  dispatch(setFilter({ filters: { ...filters } }));
  try {
    dispatch(getCars());
  } catch (e) {
    console.log(e);
  }
};
