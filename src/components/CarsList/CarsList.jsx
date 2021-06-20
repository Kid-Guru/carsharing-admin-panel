import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupCars, initialAllCarsRequest } from '../../redux/cars/actions';
import { carsTableSelector, isInitialSelector } from '../../redux/cars/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import CarsListTable from './CarsListTable/CarsListTable';
import Filters from './Filters/Filters';

function CarsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllCarsRequest());
    return () => dispatch(cleanupCars());
  }, [dispatch]);
  const carsList = useSelector(carsTableSelector);
  const isFetching = useSelector(isInitialSelector);

  if (isFetching) return <Loader />;

  return (
    <ListContentLayout
      header={<Filters />}
      content={<CarsListTable carsList={carsList} />}
      noIndentContent
    />
  );
}

export default CarsList;
