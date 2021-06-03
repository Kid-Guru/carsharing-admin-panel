import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initialOrdersRequest, setFilterOrders, setPageOrders } from '../../redux/orders/actions';
import {
  ordersSelector,
  totalOrdersSelector,
  optionsFiltersSelector,
} from '../../redux/orders/selectors';
import ButtonSubmit from '../common/Buttons/ButtonSubmit/ButtonSubmit';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import OrdersList from '../common/OrdersList/OrdersList';
import Paginator from '../common/Paginator/Paginator';
import SelectFilter from '../common/SelectFilterField/SelectFilterField';
import s from './Orders.module.scss';

const Filters = () => {
  const dispatch = useDispatch();
  const onSubmitHandle = (data) => dispatch(setFilterOrders(data));
  const { modelOption, cityOption, statusOption } = useSelector(optionsFiltersSelector);

  return (
    <Formik
      initialValues={{
        model: null,
        city: null,
        status: null,
      }}
      onSubmit={onSubmitHandle}
    >
      <Form className={s.filters} action="submit">
        <div className={s.filters__leftCol}>
          <Field name="model" component={SelectFilter} options={modelOption} placeholder="Модель" />
          <Field name="city" component={SelectFilter} options={cityOption} placeholder="Город" />
          <Field name="status" component={SelectFilter} options={statusOption} placeholder="Статус" />
        </div>
        <div className={s.filters__rightCol}>
          <ButtonSubmit text="Применить" />
        </div>
      </Form>
    </Formik>
  );
};

function Orders() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initialOrdersRequest()), []);
  const onPageChange = ({ selected }) => dispatch(setPageOrders(selected));
  const ordersList = useSelector(ordersSelector);
  const total = useSelector(totalOrdersSelector);

  return (
    <ListContentLayout
      title="Заказы"
      header={<Filters />}
      content={<OrdersList ordersList={ordersList} />}
      footer={(
        <Paginator
          onPageChange={onPageChange}
          pageCount={total}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
        />
      )}
    />
  );
}

export default Orders;
