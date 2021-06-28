import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { categoryDelete, categoryUpdate } from '../../../redux/categories/actions';
import CategoryModal from './CategoryModal';

const useEditCategoryModal = () => {
  const dispatch = useDispatch();
  const [editCategory, setEditCategory] = useState({
    isOpen: false, name: '', description: '', id: '',
  });
  const editCategoryHandle = ({ name, description, id }) => () => {
    setEditCategory({
      isOpen: true, name, description, id,
    });
  };
  const closeCallback = () => setEditCategory({
    isOpen: false, name: '', description: '', id: '',
  });

  const CategoryModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(categoryUpdate(data, closeCallback));
      const handleDelete = (id) => dispatch(categoryDelete(id, closeCallback));
      return (
        <CategoryModal
          isModalOpen={editCategory.isOpen}
          initialValues={{
            name: editCategory.name,
            description: editCategory.description,
            id: editCategory.id,
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          handleDelete={handleDelete}
          title="Редактировать категорию"
        />
      );
    },
    [dispatch, editCategory.description, editCategory.id, editCategory.isOpen, editCategory.name],
  );

  return [editCategoryHandle, CategoryModalMemo];
};

export default useEditCategoryModal;
