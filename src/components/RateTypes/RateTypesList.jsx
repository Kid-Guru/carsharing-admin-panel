import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupRateTypes, initialAllRateTypesRequest } from '../../redux/rateTypes/actions';
import { rateTypesTableSelector, isInitialSelector } from '../../redux/rateTypes/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Table from '../common/Table/Table';
import useEditRateTypeModal from './Modals/useEditRateTypeModal';
import useNewRateTypeModal from './Modals/useNewRateTypeModal';

const titles = [
  { title: 'Название', width: '160px' },
  { title: 'Ед. измерения', width: '160px' },
];

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
          <Table
            headers={titles}
            content={rateTypesList}
            actionBtnNew={openNewRateTypeModal}
            actionBtnEdit={openEditRateTypeModal}
          />
        )}
        noIndentContent
      />
      <EditRateTypeModal />
      <NewRateTypeModal />
    </>
  );
}

export default RateTypesList;
