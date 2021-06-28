import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryPost } from '../../../redux/categories/actions';
import CategoryModal from './CategoryModal';

const useNewCategoryModal = () => {
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState({ isOpen: false });
  const editCategoryHandle = () => setEditCategory({ isOpen: true });
  const closeCallback = () => setEditCategory({ isOpen: false });

  const CategoryModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(categoryPost(data, closeCallback));
      return (
        <CategoryModal
          isModalOpen={editCategory.isOpen}
          initialValues={{
            name: '',
            description: '',
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          title="Добавить категорию"
        />
      );
    },
    [dispatch, editCategory.isOpen],
  );

  return [editCategoryHandle, CategoryModalMemo];
};

export default useNewCategoryModal;
