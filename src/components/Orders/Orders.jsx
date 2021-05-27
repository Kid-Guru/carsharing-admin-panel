import { Field, Form, Formik } from 'formik';
import ButtonSubmit from '../common/Buttons/ButtonSubmit/ButtonSubmit';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Paginator from '../common/Paginator/Paginator';
import SelectFilter from '../common/SelectFilterField/SelectFilterField';
import OrdersList from '../common/OrdersList/OrdersList';
import s from './Orders.module.scss';

const options = [{ label: 'option1', value: 'option1id' }, { label: 'option2', value: 'option2id' }];

function Orders() {
  const onSubmitHandle = (e) => console.log(e);

  const Filters = () => (
    <Formik
      initialValues={{
        example: '',
        example2: '',
        example3: '',
      }}
      onSubmit={onSubmitHandle}
    >
      <Form className={s.filters} action="submit">
        <div className={s.filters__leftCol}>
          <Field name="example" component={SelectFilter} options={options} placeholder="fregrt" />
          <Field name="example2" component={SelectFilter} options={options} placeholder="fregrt" />
          <Field name="example3" component={SelectFilter} options={options} placeholder="fregrt" />
        </div>
        <div className={s.filters__rightCol}>
          <ButtonSubmit text="Применить" />
        </div>
      </Form>
    </Formik>
  );

  return (
    <ListContentLayout header={<Filters />} content={<OrdersList />} footer={<Paginator />} />
  );
}

export default Orders;
