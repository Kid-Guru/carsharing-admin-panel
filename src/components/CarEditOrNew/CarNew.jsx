import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { carPost, cleanupCar, prepareData } from '../../redux/carEdit/actions';
import {
  fieldsOptionsSelector, isFetchingSelector, isTrasferSeccuessSelector,
} from '../../redux/carEdit/selectors';
import appRoutes from '../../routes/appRoutes';
import Loader from '../common/Loader/Loader';
import CarForm from './CarForm/CarForm';

function CarNew() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(prepareData());
    return () => dispatch(cleanupCar());
  }, [dispatch]);
  const initValues = {
    model: '',
    number: '',
    minPrice: '',
    maxPrice: '',
    fuelLevel: '',
    category: null,
    description: '',
    availableColors: [],
    thumbnail: {},
  };
  const { categoryOptions } = useSelector(fieldsOptionsSelector);
  const isFetching = useSelector(isFetchingSelector);
  const isTrasferSeccuess = useSelector(isTrasferSeccuessSelector);
  const history = useHistory();

  const submitHandle = (formData) => dispatch(carPost(formData));

  if (isTrasferSeccuess) {
    history.push(appRoutes.dashboardCars());
  }
  if (isFetching) return <Loader />;
  return (
    <CarForm
      initValues={initValues}
      categoryOptions={categoryOptions}
      submitHandle={submitHandle}
    />
  );
}

export default CarNew;
