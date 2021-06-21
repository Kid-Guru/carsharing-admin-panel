import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  carDelete, carRequest, carUpdate, cleanupCar,
} from '../../redux/carEdit/actions';
import {
  fieldsOptionsSelector, initValuesSelector, isFetchingSelector, isTrasferSeccuessSelector,
} from '../../redux/carEdit/selectors';
import appRoutes from '../../routes/appRoutes';
import Loader from '../common/Loader/Loader';
import CarForm from './CarForm/CarForm';

function CarEdit({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(carRequest(id));
    return () => dispatch(cleanupCar());
  }, [id, dispatch]);
  const initValues = useSelector(initValuesSelector);
  const { categoryOptions } = useSelector(fieldsOptionsSelector);
  const isFetching = useSelector(isFetchingSelector);
  const isTrasferSeccuess = useSelector(isTrasferSeccuessSelector);
  const history = useHistory();

  const submitHandle = (formData) => dispatch(carUpdate(formData));
  const deleteHandle = () => dispatch(carDelete(id));

  if (isTrasferSeccuess) {
    history.push(appRoutes.dashboardCars());
  }
  if (isFetching) return <Loader />;
  return (
    <CarForm
      initValues={initValues}
      categoryOptions={categoryOptions}
      submitHandle={submitHandle}
      deleteHandle={deleteHandle}
    />
  );
}

export default CarEdit;
