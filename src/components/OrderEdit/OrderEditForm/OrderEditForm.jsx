import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import { colorOptionsSelectorCarry } from '../../../redux/cars/selectors';
import { fieldsOptionsSelector, initValuesSelector } from '../../../redux/orderEdit/selectors';
import { pointOptionsSelectorCarry } from '../../../redux/points/selectors';
import CheckboxBtnGroup from '../../Form/CheckboxBtnGroup/CheckboxBtnGroup';
import DateField from '../../Form/DateField/DateField';
import RadioBtnGroup from '../../Form/RadioBtnGroup/RadioBtnGroup';
import SelectField from '../../Form/SelectField/SelectField';
import s from './OrderEditForm.module.scss';

const extraOptions = [
  { text: 'Полный бак', name: 'isFullTank' },
  { text: 'Детское кресло', name: 'isNeedChildChair' },
  { text: 'Правый руль', name: 'isRightWheel' },
];

function OrderEditForm({ formRef, handleSubmit }) {
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
    cityOptions, statusOptions, rateOptions, carOptions,
  } = useSelector(fieldsOptionsSelector);
  const pointOptionsSelector = useSelector(pointOptionsSelectorCarry);
  const colorOptionsSelector = useSelector(colorOptionsSelectorCarry);
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
        {(prop) => {
          // eslint-disable-next-line object-curly-newline
          const { values: { dateFrom, dateTo, city, car } } = prop;
          const maxDateFrom = dateTo && new Date(dateTo);
          const minDateFrom = new Date();
          const maxDateTo = null;
          const minDateTo = dateFrom && new Date(dateFrom);
          return (
            <Form className={s.form}>
              <div className={s.form__col}>
                <SelectField label="Город" placeholder="Выберете город" name="city" options={cityOptions} />
                <SelectField label="Пункт выдачи" placeholder="Выберете пункт выдачи" name="point" options={pointOptionsSelector(city)} />
                <SelectField label="Статус" placeholder="Статус заказа" name="status" options={statusOptions} />
              </div>
              <div className={s.form__col}>
                <SelectField label="Тариф" placeholder="Выберете тариф" name="rate" options={rateOptions} />
                <DateField label="Начало аренды" placeholder="Выберете дату и время" name="dateFrom" maxDate={maxDateFrom} minDate={minDateFrom} />
                <DateField label="Конец аренды" placeholder="Выберете дату и время" name="dateTo" maxDate={maxDateTo} minDate={minDateTo} />
              </div>
              <div className={s.form__col}>
                <SelectField label="Машина" placeholder="Выберете машину" name="car" options={carOptions} />
                <RadioBtnGroup name="color" title="Цвет машины" items={colorOptionsSelector(car)} />
                <CheckboxBtnGroup title="Дополнительно" items={extraOptions} />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default OrderEditForm;
