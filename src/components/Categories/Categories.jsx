import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupCategories, initialAllCategoriesRequest } from '../../redux/categories/actions';
import { categoriesTableSelector, isInitialSelector } from '../../redux/categories/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import CategoriesListTable from './CategoriesListTable/CategoriesListTable';
import useEditCategoryModal from './Modals/useEditCategoryModal';
import useNewCategoryModal from './Modals/useNewCategoryModal';

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
        title="Тарифы"
        content={(
          <CategoriesListTable
            categoriesList={categoriesList}
            editCategoryHandle={openEditCategoryModal}
            newCategoryHandle={openNewCategoryModal}
          />
        )}
        noIndentContent
        leftAlignment
      />
      <EditCategoryModal />
      <NewCategoryModal />
    </>
  );
}

export default CategoriesList;
