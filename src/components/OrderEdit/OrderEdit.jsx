import { Formik, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { cleanupOrder, orderRequest, orderUpdate } from '../../redux/orderEdit/actions';
import {
  initValuesSelector, isFetchingSelector, isTrasferSeccuessSelector,
} from '../../redux/orderEdit/selectors';
import appRoutes from '../../routes/appRoutes';
import Button from '../common/Buttons/Button';
import ButtonSubmit from '../common/Buttons/ButtonSubmit';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import s from './OrderEdit.module.scss';
import OrderEditForm from './OrderEditForm/OrderEditForm';

function Footer() {
  const { submitForm } = useFormikContext();
  const history = useHistory();
  const handleBack = () => history.push(appRoutes.dashboardOrders());
  return (
    <div className={s.footer}>
      <div className={s.footer__col}>
        <span className={s.footer__btn}>
          <ButtonSubmit onClick={submitForm} text="Сохранить" />
        </span>
        <span className={s.footer__btn}>
          <Button onClick={handleBack} text="Назад" color="secondary" />
        </span>
      </div>
    </div>
  );
}

function OrderEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderRequest(id));
    return () => dispatch(cleanupOrder());
  }, [id, dispatch]);
  const isFetching = useSelector(isFetchingSelector);
  const isTrasferSeccuess = useSelector(isTrasferSeccuessSelector);
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
