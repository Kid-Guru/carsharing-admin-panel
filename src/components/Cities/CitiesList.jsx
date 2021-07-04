import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupCities, initialAllCitiesRequest } from '../../redux/cities/actions';
import { citiesTableSelector, isInitialSelector } from '../../redux/cities/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Table from '../common/Table/Table';
import useEditCityModal from './Modals/useEditCityModal';
import useNewCityModal from './Modals/useNewCityModal';

const titles = [
  { title: 'Город', width: '160px' },
];

function CitiesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllCitiesRequest());
    return () => dispatch(cleanupCities());
  }, [dispatch]);
  const citiesList = useSelector(citiesTableSelector);
  const isInitial = useSelector(isInitialSelector);

  const [openEditCityModal, EditCityModal] = useEditCityModal();
  const [openNewCityModal, NewCityModal] = useNewCityModal();

  if (isInitial) return <Loader />;
  return (
    <>
      <ListContentLayout
        title="Города"
        content={(
          <Table
            headers={titles}
            content={citiesList}
            actionBtnNew={openNewCityModal}
            actionBtnEdit={openEditCityModal}
          />
        )}
        noIndentContent
      />
      <EditCityModal />
      <NewCityModal />
    </>
  );
}

export default CitiesList;
