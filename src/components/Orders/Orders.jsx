import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersRequest, setPageOrders } from '../../redux/orders/actions';
import { ordersSelector, totalOrdersSelector } from '../../redux/orders/selectors';
import ButtonSubmit from '../common/Buttons/ButtonSubmit/ButtonSubmit';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import OrdersList from '../common/OrdersList/OrdersList';
import Paginator from '../common/Paginator/Paginator';
import SelectFilter from '../common/SelectFilterField/SelectFilterField';
import s from './Orders.module.scss';

const options = [{ label: 'option1', value: 'option1id' }, { label: 'option2', value: 'option2id' }];

function Orders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrdersRequest());
    // return () => {
    //   cleanup
    // }
  }, []);
  // const isFetching = useSelector((state) => state.orders.statuts === 'fetching');
  const ordersList = useSelector(ordersSelector);
  const total = useSelector(totalOrdersSelector);

  const onPageChange = ({ selected }) => dispatch(setPageOrders(selected + 1));
  const onSubmitHandle = (e) => console.log(e);
  console.log(total)
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
    <ListContentLayout
      header={<Filters />}
      content={<OrdersList ordersList={ordersList} />}
      footer={(
        <Paginator
          onPageChange={onPageChange}
          pageCount={total}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
        />
      )}
    />
  );
}

export default Orders;
