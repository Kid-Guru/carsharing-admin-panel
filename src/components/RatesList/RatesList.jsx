import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupRates, initialAllRatesRequest } from '../../redux/rates/actions';
import { ratesTableSelector, isInitialSelector } from '../../redux/rates/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import RatesListTable from './RatesListTable/RatesListTable';
import useEditRateModal from './Modals/useEditRateModal';
import useNewRateModal from './Modals/useNewRateModal';

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
          <RatesListTable
            ratesList={ratesList}
            editRateHandle={openEditRateModal}
            newRateHandle={openNewRateModal}
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
