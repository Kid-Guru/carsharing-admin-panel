import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { initialOrdersRequest, setFilterOrders, setPageOrders } from '../../redux/orders/actions';
import {
  ordersSelector,
  totalOrdersSelector,
  optionsFiltersSelector,
  currentFiltersSelector,
} from '../../redux/orders/selectors';
import ButtonSubmit from '../common/Buttons/ButtonSubmit';
import Button from '../common/Buttons/Button';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import OrdersList from '../common/OrdersList/OrdersList';
import Paginator from '../common/Paginator/Paginator';
import SelectFilter from '../common/SelectFilterField/SelectFilterField';
import SidePortal from '../common/SidePortal/SidePortal';
import s from './Orders.module.scss';

const Filters = (props) => {
  const { onSubmitHandle } = props;
  const { modelOption, cityOption, statusOption } = useSelector(optionsFiltersSelector);
  const { model, city, status } = useSelector(currentFiltersSelector);
  return (
    <Formik
      initialValues={{
        model,
        city,
        status,
      }}
      onSubmit={onSubmitHandle}
    >
      <Form className={s.filters} action="submit">
        <div className={s.filters__col}>
          <Field name="model" component={SelectFilter} options={modelOption} placeholder="Модель" />
        </div>
        <div className={s.filters__col}>
          <Field name="city" component={SelectFilter} options={cityOption} placeholder="Город" />
        </div>
        <div className={s.filters__col}>
          <Field name="status" component={SelectFilter} options={statusOption} placeholder="Статус" />
        </div>
        <div className={s.filters__col}>
          <ButtonSubmit text="Применить" />
        </div>
      </Form>
    </Formik>
  );
};

const FiltersWithPortal = () => {
  const [isSideFiltersOpen, toggleSideFilters] = useState(false);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const onSubmitHandle = (data) => {
    dispatch(setFilterOrders(data));
    toggleSideFilters(false);
  };
  if (width < 1023.98) {
    return (
      <>
        <SidePortal isOpen={isSideFiltersOpen} closePortalCallback={() => toggleSideFilters(false)}>
          <div className={s.sidePortal}>
            <Filters onSubmitHandle={onSubmitHandle} />
          </div>
        </SidePortal>
        <div className={s.showFiltersBtn}>
          <Button text="Фильтры" onClick={() => toggleSideFilters(true)} />
        </div>
      </>
    );
  }
  return (
    <Filters onSubmitHandle={onSubmitHandle} />
  );
};

function Orders() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initialOrdersRequest()), []);
  const onPageChange = ({ page }) => dispatch(setPageOrders(page));
  const ordersList = useSelector(ordersSelector);
  const total = useSelector(totalOrdersSelector);

  return (
    <ListContentLayout
      title="Заказы"
      header={<FiltersWithPortal />}
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
