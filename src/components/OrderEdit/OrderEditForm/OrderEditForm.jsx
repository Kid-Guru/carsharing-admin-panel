import { Form } from 'formik';
import { useSelector } from 'react-redux';
import { colorOptionsSelectorCarry } from '../../../redux/cars/selectors';
import { fieldsOptionsSelector } from '../../../redux/orderEdit/selectors';
import { pointOptionsSelectorCarry } from '../../../redux/points/selectors';
import CheckboxBtnGroup from '../../Form/CheckboxBtnGroup/CheckboxBtnGroup';
import DateField from '../../Form/DateField/DateField';
import RadioBtnGroup from '../../Form/RadioBtnGroup/RadioBtnGroup';
import SelectField from '../../Form/SelectField/SelectField';
import OrderPrice from './OrderPrice';
import s from './OrderEditForm.module.scss';

const extraOptions = [
  { text: 'Полный бак', name: 'isFullTank' },
  { text: 'Детское кресло', name: 'isNeedChildChair' },
  { text: 'Правый руль', name: 'isRightWheel' },
];

function OrderEditForm({
  dateFrom, dateTo, city, car,
}) {
  const {
    cityOptions, statusOptions, rateOptions, carOptions,
  } = useSelector(fieldsOptionsSelector);

  const pointOptionsSelector = useSelector(pointOptionsSelectorCarry);
  const colorOptionsSelector = useSelector(colorOptionsSelectorCarry);

  const maxDateFrom = dateTo && new Date(dateTo);
  // const minDateFrom = new Date();
  const minDateFrom = null;
  const maxDateTo = null;
  const minDateTo = dateFrom && new Date(dateFrom);
  const filterTimeFrom = (time) => {
    const selectedDate = new Date(time);
    if (dateTo === null) return true;
    return dateTo > selectedDate;
  };
  const filterTimeTo = (time) => {
    const selectedDate = new Date(time);
    if (dateFrom === null) return true;
    return dateFrom < selectedDate;
  };
  return (
    <div className={s.edit__wrapper}>
      <Form className={s.form} action="submit">
        <div className={s.form__col}>
          <SelectField label="Город" placeholder="Выберете город" name="city" options={cityOptions} />
          <SelectField label="Пункт выдачи" placeholder="Выберете пункт выдачи" name="point" options={pointOptionsSelector(city)} />
          <SelectField label="Статус" placeholder="Статус заказа" name="status" options={statusOptions} />
        </div>
        <div className={s.form__col}>
          <SelectField label="Тариф" placeholder="Выберете тариф" name="rate" options={rateOptions} />
          <DateField label="Начало аренды" placeholder="Выберете дату и время" name="dateFrom" maxDate={maxDateFrom} minDate={minDateFrom} filterTime={filterTimeFrom} />
          <DateField label="Конец аренды" placeholder="Выберете дату и время" name="dateTo" maxDate={maxDateTo} minDate={minDateTo} filterTime={filterTimeTo} />
        </div>
        <div className={s.form__col}>
          <SelectField label="Машина" placeholder="Выберете машину" name="car" options={carOptions} />
          <RadioBtnGroup name="color" title="Цвет машины" items={colorOptionsSelector(car)} />
          <CheckboxBtnGroup title="Дополнительно" items={extraOptions} />
        </div>
      </Form>
      <OrderPrice />
    </div>
  );
}

export default OrderEditForm;
