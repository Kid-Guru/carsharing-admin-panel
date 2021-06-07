import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import DateField from '../Form/DateField/DateField';
import RadioBtnGroup from '../Form/RadioBtnGroup/RadioBtnGroup';
import CheckboxBtnGroup from '../Form/CheckboxBtnGroup/CheckboxBtnGroup';
import SelectField from '../Form/SelectField/SelectField';
import s from './OrderEdit.module.scss';

const rateOptions = [{ label: 'тариф 1', value: 'id1' }, { label: 'тариф 2', value: 'id2' }, { label: 'тариф 3', value: 'id3' }];

const items = [{ id: 1, text: 'fergr' }, { id: 2, text: 'grg' }, { id: 3, text: 'feggrrrgr' }];
const items2 = [{ id: 3, text: 'пкеп' }, { id: 4, text: 'gекпкеrg' }, { id: 5, text: 'feggrпекпекrrgr' }];

function OrderEditContent() {
  const onSubmitHandle = (data) => console.log(data);
  return (
    <div className={s.edit__wrapper}>
      <Formik
        initialValues={{
          rate: null,

        }}
        onSubmit={onSubmitHandle}
      >
        <Form>
          <SelectField label="Город" placeholder="Выберете город" name="city" options={rateOptions} />
          <SelectField label="Пункт выдачи" placeholder="Выберете пункт выдачи" name="point" options={rateOptions} />
          <SelectField label="Статус" placeholder="Статус заказа" name="status" options={rateOptions} />
          <SelectField label="Тариф" placeholder="Выберете тариф" name="rate" options={rateOptions} />
          {/* <DateField label="Начало аренды" placeholder="Выберете дату и время" name="dateFrom" /> */}
          {/* <DateField label="Конец аренды" placeholder="Выберете дату и время" name="dateTo" /> */}
          <RadioBtnGroup title="Заголовок" items={items} />
          <CheckboxBtnGroup title="Pfujkjdjr" items={items2} />
          {/* <SelectField label="Тариф" placeholder="Выберете тариф" name="rate" options={rateOptions} /> */}
        </Form>
      </Formik>
    </div>
  );
}

function OrderEdit() {
  const { id } = useParams();
  return (
    <ListContentLayout
      title="Редактирование заказа"
      header={id}
      content={<OrderEditContent />}
    // footer={}
    />
  );
}

export default OrderEdit;
