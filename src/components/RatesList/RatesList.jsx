import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupRates, initialAllRatesRequest } from '../../redux/rates/actions';
import { ratesTableSelector, isInitialSelector } from '../../redux/rates/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Table from '../common/Table/Table';
import useEditRateModal from './Modals/useEditRateModal';
import useNewRateModal from './Modals/useNewRateModal';

const titles = [
  { title: 'Тип тарифа', width: '160px' },
  { title: 'Цена', width: '90px' },
];

function RatesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllRatesRequest());
    return () => dispatch(cleanupRates());
  }, [dispatch]);
  const ratesList = useSelector(ratesTableSelector);
  const isInitial = useSelector(isInitialSelector);

  const [openEditRateModal, EditRateModal] = useEditRateModal();
  const [openNewRateModal, NewRateModal] = useNewRateModal();

  if (isInitial) return <Loader />;
  return (
    <>
      <ListContentLayout
        title="Тарифы"
        content={(
          <Table
            headers={titles}
            content={ratesList}
            actionBtnNew={openNewRateModal}
            actionBtnEdit={openEditRateModal}
          />
        )}
        noIndentContent
      />
      <EditRateModal />
      <NewRateModal />
    </>
  );
}

export default RatesList;
