import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../../redux/cars/actions';
import { carsTableSelector, isFetchingSelector } from '../../redux/cars/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import CarsListTable from './CarsListTable/CarsListTable';

function CarsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCars());
  }, [dispatch]);
  const carsList = useSelector(carsTableSelector);
  const isFetching = useSelector(isFetchingSelector);

  if (isFetching) return <Loader />;

  return (
    <ListContentLayout
      header="Добавить"
      content={<CarsListTable carsList={carsList} />}
    />
  );
}

export default CarsList;
