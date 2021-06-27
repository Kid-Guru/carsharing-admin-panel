import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupRateTypes, initialAllRateTypesRequest } from '../../redux/rateTypes/actions';
import { rateTypesTableSelector, isInitialSelector } from '../../redux/rateTypes/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import RateTypesListTable from './RateTypesListTable/RateTypesListTable';
import useEditRateTypeModal from './Modals/useEditRateTypeModal';
import useNewRateTypeModal from './Modals/useNewRateTypeModal';

function RateTypesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllRateTypesRequest());
    return () => dispatch(cleanupRateTypes());
  }, [dispatch]);
  const rateTypesList = useSelector(rateTypesTableSelector);
  const isInitial = useSelector(isInitialSelector);

  const [openEditRateTypeModal, EditRateTypeModal] = useEditRateTypeModal();
  const [openNewRateTypeModal, NewRateTypeModal] = useNewRateTypeModal();

  if (isInitial) return <Loader />;
  return (
    <>
      <ListContentLayout
        title="Типы тарифов"
        content={(
          <RateTypesListTable
            rateTypesList={rateTypesList}
            editRateTypeHandle={openEditRateTypeModal}
            newRateTypeHandle={openNewRateTypeModal}
          />
        )}
        noIndentContent
        leftAlignment
      />
      <EditRateTypeModal />
      <NewRateTypeModal />
    </>
  );
}

export default RateTypesList;
