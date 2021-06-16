import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';

export const setCategories = createAction('SET_CATEGORIES');
export const setStatus = createAction('SET_CATEGORIES_STATUS');
// export const setStatusExtraData = createAction('SET_CATEGORIES_STATUS_EXTRA_DATA');
// export const cleanupCategories = createAction('CLEANUP_CATEGORIES');

// Добавить обработку ошибки!!!
export const getAllCategories = () => async (dispatch, getState) => {
  const statusCategories = getState().categories.status;
  if (statusCategories === 'received') return;

  dispatch(setStatus({ status: 'fetching' }));
  try {
    const responseCategories = await apiService.getCategories();
    const categories = responseCategories.data.data;
    dispatch(setCategories({ data: categories }));
    dispatch(setStatus({ status: 'received' }));
  } catch (e) {
    dispatch(setStatus({ status: 'error' }));
    throw new Error('Ошибка получения данных');
  }
};

// export const initialCategoriesRequest = () => async (dispatch) => {
//   dispatch(setStatusExtraData({ status: 'fetching' }));
//   const responses = [
//     dispatch(getAllCategories()),
//   ];

//   Promise.all(responses)
//     .then(() => dispatch(setStatusExtraData({ status: 'received' })))
//     .catch((e) => {
//       console.log(e);
//       dispatch(setStatusExtraData({ status: 'error' }));
//     });
// };
