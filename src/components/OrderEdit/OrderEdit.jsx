import { Form, Formik } from 'formik';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { cleanupOrder, orderRequest, orderUpdate } from '../../redux/orderEdit/actions';
import {
  fieldsOptionsSelector, initValuesSelector, isFetchingSelector, isTrasferSeccuessSelector,
} from '../../redux/orderEdit/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import CheckboxBtnGroup from '../Form/CheckboxBtnGroup/CheckboxBtnGroup';
import RadioBtnGroup from '../Form/RadioBtnGroup/RadioBtnGroup';
import SelectField from '../Form/SelectField/SelectField';
import DateField from '../Form/DateField/DateField';
import Button from '../common/Buttons/Button';
import s from './OrderEdit.module.scss';
import appRoutes from '../../routes/appRoutes';

const extraOptions = [
  { text: 'Полный бак', name: 'isFullTank' },
  { text: 'Детское кресло', name: 'isNeedChildChair' },
  { text: 'Правый руль', name: 'isRightWheel' },
];

function OrderEditContent({ formRef, handleSubmit }) {
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
  } = useSelector(initValuesSelector);
  const {
    cityOptions, pointOptions, statusOptions, rateOptions, carOptions, colorOptions,
  } = useSelector(fieldsOptionsSelector);

  return (
    <div className={s.edit__wrapper}>
      <Formik
        innerRef={formRef}
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
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <SelectField label="Город" placeholder="Выберете город" name="city" options={cityOptions} />
          <SelectField label="Пункт выдачи" placeholder="Выберете пункт выдачи" name="point" options={pointOptions} />
          <SelectField label="Машина" placeholder="Выберете машину" name="car" options={carOptions} />
          <SelectField label="Тариф" placeholder="Выберете тариф" name="rate" options={rateOptions} />
          <SelectField label="Статус" placeholder="Статус заказа" name="status" options={statusOptions} />
          <DateField label="Начало аренды" placeholder="Выберете дату и время" name="dateFrom" />
          <DateField label="Конец аренды" placeholder="Выберете дату и время" name="dateTo" />
          <RadioBtnGroup name="color" title="Цвет машины" items={colorOptions} />
          <CheckboxBtnGroup title="Дополнительно" items={extraOptions} />
        </Form>
      </Formik>
    </div>
  );
}

function Footer({ handleSave, handleBack }) {
  return (
    <div className={s.footer}>
      <span className={s.footer__btn}>
        <Button onClick={handleSave} text="Сохранить" color="primary" />
      </span>
      <span className={s.footer__btn}>
        <Button onClick={handleBack} text="Назад" color="secondary" />
      </span>
    </div>
  );
}

function OrderEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderRequest(id));
    return () => {
      dispatch(cleanupOrder());
    };
  }, [id, dispatch]);
  const formRef = useRef();
  const history = useHistory();
  const isFetching = useSelector(isFetchingSelector);
  const isTrasferSeccuess = useSelector(isTrasferSeccuessSelector);

  if (isFetching) return null;
  if (isTrasferSeccuess) return <Redirect to={appRoutes.dashboardOrders()} />;

  const handleBack = () => history.push(appRoutes.dashboardOrders());
  const submitRef = () => {
    if (formRef.current) formRef.current.handleSubmit();
  };
  const handleSubmit = (data) => dispatch(orderUpdate(data));
  return (
    <ListContentLayout
      title="Редактирование"
      header={`Заказ ${id}`}
      content={<OrderEditContent formRef={formRef} handleSubmit={handleSubmit} />}
      footer={<Footer handleSave={submitRef} handleBack={handleBack} />}
    />
  );
}

export default OrderEdit;
