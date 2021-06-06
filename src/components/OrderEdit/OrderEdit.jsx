import { Form, Formik } from 'formik';
import { useParams } from 'react-router-dom';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import SelectField from '../Form/SelectField/SelectField';
import s from './OrderEdit.module.scss';

const rateOptions = [{ label: 'тариф 1', value: 'id1' }, { label: 'тариф 2', value: 'id2' }, { label: 'тариф 3', value: 'id3' }];

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
          <SelectField label="Пункт выдачи" placeholder="Выберете пункт выдачи" name="rate" options={rateOptions} />
          <SelectField label="Статус" placeholder="Статус заказа" name="status" options={rateOptions} />
          <SelectField label="Тариф" placeholder="Выберете тариф" name="rate" options={rateOptions} />
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
