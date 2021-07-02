import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupCars, initialAllCarsRequest, setPageCars } from '../../redux/cars/actions';
import {
  carsTableSelector, pageSelector, isInitialSelector, totalCarsSelector,
} from '../../redux/cars/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Paginator from '../common/Paginator/Paginator';
import CarsListTable from './CarsListTable/CarsListTable';
import Filters from './Filters/Filters';

function CarsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllCarsRequest());
    return () => dispatch(cleanupCars());
  }, [dispatch]);
  const onPageChange = ({ selected }) => dispatch(setPageCars(selected));
  const totalPages = useSelector(totalCarsSelector);
  const page = useSelector(pageSelector);
  const carsList = useSelector(carsTableSelector);
  const isFetching = useSelector(isInitialSelector);

  if (isFetching) return <Loader />;

  return (
    <ListContentLayout
      title="Машины"
      header={<Filters />}
      content={<CarsListTable carsList={carsList} />}
      footer={(
        <Paginator
          onPageChange={onPageChange}
          pageCount={totalPages}
          forcePage={page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
        />
      )}
      noIndentContent
    />
  );
}

export default CarsList;
