import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { cleanupOrder, orderRequest, orderUpdate } from '../../redux/orderEdit/actions';
import {
  initValuesSelector, isFetchingSelector, isNotFoundSelector, isTrasferSeccuessSelector,
} from '../../redux/orderEdit/selectors';
import appRoutes from '../../routes/appRoutes';
import ErrorScreen from '../common/ErrorScreen/ErrorScreen';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Footer from './Footer/Footer';
import OrderEditForm from './OrderEditForm/OrderEditForm';

function OrderEdit({ id }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderRequest(id));
    return () => dispatch(cleanupOrder());
  }, [id, dispatch]);
  const isFetching = useSelector(isFetchingSelector);
  const isTrasferSeccuess = useSelector(isTrasferSeccuessSelector);
  const isNotFound = useSelector(isNotFoundSelector);
  const {
    initCity,
    initPoint,
    initStatus,
    initRate,
    initCar,
    initColor,
    initDateFrom,
    initDateTo,
    initIsFullTank,
    initIsNeedChildChair,
    initIsRightWheel,
    initPrice,
  } = useSelector(initValuesSelector);

  if (isFetching) return <Loader />;
  if (isTrasferSeccuess) return <Redirect to={appRoutes.dashboardOrders()} />;
  if (isNotFound) return <ErrorScreen text="Заказ не найден" />;

  const onSubmitHandle = (data) => dispatch(orderUpdate({ ...data }));
  return (
    <Formik
      initialValues={{
        city: initCity,
        point: initPoint,
        status: initStatus,
        rate: initRate,
        car: initCar,
        color: initColor,
        dateFrom: initDateFrom,
        dateTo: initDateTo,
        isFullTank: initIsFullTank,
        isNeedChildChair: initIsNeedChildChair,
        isRightWheel: initIsRightWheel,
        price: initPrice,
      }}
      onSubmit={onSubmitHandle}
    >
      {({ values }) => {
        const {
          dateFrom, dateTo, city, car,
        } = values;
        return (
          <ListContentLayout
            title="Редактирование"
            header={`Заказ ${id}`}
            content={(
              <OrderEditForm
                dateFrom={dateFrom}
                dateTo={dateTo}
                city={city}
                car={car}
              />
            )}
            footer={<Footer />}
          />
        );
      }}
    </Formik>
  );
}

export default OrderEdit;
