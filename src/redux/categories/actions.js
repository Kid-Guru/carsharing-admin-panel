import { createAction } from 'redux-actions';
import { apiService } from '../../api/service';
import { showMessage } from '../messageBar/actions';

export const setCategories = createAction('SET_CATEGORIES');
export const setStatus = createAction('SET_CATEGORIES_STATUS');
export const cleanupCategories = createAction('CLEANUP_CATEGORIES');

const getCategories = () => async (dispatch) => {
  try {
    const responseCategories = await apiService.getCategories();
    const categories = responseCategories.data.data;
    dispatch(setCategories({ data: categories }));
  } catch (e) {
    throw new Error('Произошла ошибка получения данных. Попробуйте еще');
  }
};

// eslint-disable-next-line arrow-body-style
export const externalAllCategoriesRequest = () => async (dispatch) => {
  return dispatch(getCategories());
};

export const initialAllCategoriesRequest = () => async (dispatch) => {
  dispatch(setStatus({ status: 'initial' }));
  dispatch(getCategories())
    .then(() => {
      dispatch(setStatus({ status: 'received' }));
    })
    .catch((e) => {
      dispatch(showMessage(e.message, 'alert'));
    });
};

export const categoryUpdate = (categoryData, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    name: categoryData.name,
    description: categoryData.description,
    id: categoryData.id,
  };
  try {
    await apiService.putCategories(categoryData.id, requestBody);
    await dispatch(getCategories());
    dispatch(showMessage('Категория успешно сохранена!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const categoryDelete = (id, closeModalCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  try {
    await apiService.deleteCategories(id);
    await dispatch(getCategories());
    dispatch(showMessage('Категория успешно удалена!!', 'success'));
    closeModalCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};

export const categoryPost = (categoryData, closeCallback) => async (dispatch) => {
  dispatch(setStatus({ status: 'transfering' }));
  const requestBody = {
    name: categoryData.name,
    description: categoryData.description,
  };
  try {
    await apiService.postCategories(requestBody);
    await dispatch(getCategories());
    dispatch(showMessage('Категория успешно сохранена!!', 'success'));
    closeCallback();
  } catch (e) {
    dispatch(showMessage('Произошла ошибка, попробуйте еще', 'alert'));
  }
};
