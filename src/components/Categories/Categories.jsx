import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupCategories, initialAllCategoriesRequest } from '../../redux/categories/actions';
import { categoriesTableSelector, isInitialSelector } from '../../redux/categories/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Table from '../common/Table/Table';
import useEditCategoryModal from './Modals/useEditCategoryModal';
import useNewCategoryModal from './Modals/useNewCategoryModal';

const titles = [
  { title: 'Название', width: '140px' },
  { title: 'Описание', width: '200px' },
];

function CategoriesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllCategoriesRequest());
    return () => dispatch(cleanupCategories());
  }, [dispatch]);
  const categoriesList = useSelector(categoriesTableSelector);
  const isInitial = useSelector(isInitialSelector);

  const [openEditCategoryModal, EditCategoryModal] = useEditCategoryModal();
  const [openNewCategoryModal, NewCategoryModal] = useNewCategoryModal();

  if (isInitial) return <Loader />;
  return (
    <>
      <ListContentLayout
        title="Категории"
        content={(
          <Table
            headers={titles}
            content={categoriesList}
            actionBtnNew={openNewCategoryModal}
            actionBtnEdit={openEditCategoryModal}
          />
        )}
        noIndentContent
      />
      <EditCategoryModal />
      <NewCategoryModal />
    </>
  );
}

export default CategoriesList;
