import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import {
  cleanupOrders, initialOrdersRequest, setFilterOrders, setPageOrders,
} from '../../redux/orders/actions';
import {
  initialPageSelector,
  isInitialSelector,
  optionsFiltersSelector,
  ordersSelector,
  totalOrdersSelector,
} from '../../redux/orders/selectors';
import Button from '../common/Buttons/Button';
import ButtonSubmit from '../common/Buttons/ButtonSubmit';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import OrdersListTable from './OrdersListTable/OrdersListTable';
import Paginator from '../common/Paginator/Paginator';
import SelectFilter from '../common/SelectFilterField/SelectFilterField';
import SidePortal from '../common/SidePortal/SidePortal';
import Loader from '../common/Loader/Loader';
import s from './OrdersList.module.scss';

const Filters = () => {
  const { modelOptions, cityOptions, statusOptions } = useSelector(optionsFiltersSelector);
  return (
    <Form className={s.filters} action="submit">
      <div className={s.filters__col}>
        <Field name="model" component={SelectFilter} options={modelOptions} placeholder="Модель" />
      </div>
      <div className={s.filters__col}>
        <Field name="city" component={SelectFilter} options={cityOptions} placeholder="Город" />
      </div>
      <div className={s.filters__col}>
        <Field name="status" component={SelectFilter} options={statusOptions} placeholder="Статус" />
      </div>
      <div className={s.filters__col}>
        <ButtonSubmit text="Применить" />
      </div>
    </Form>
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
  return (
    <Formik
      initialValues={{
        model: null,
        city: null,
        status: null,
      }}
      onSubmit={onSubmitHandle}
    >
      {() => {
        if (width < 1023.98) {
          return (
            <>
              <SidePortal
                isOpen={isSideFiltersOpen}
                closePortalCallback={() => toggleSideFilters(false)}
              >
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
      }}
    </Formik>
  );
};

function OrdersList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialOrdersRequest());
    return () => dispatch(cleanupOrders());
  }, [dispatch]);
  const onPageChange = ({ selected }) => dispatch(setPageOrders(selected));
  const ordersList = useSelector(ordersSelector);
  const totalPages = useSelector(totalOrdersSelector);
  const initialPage = useSelector(initialPageSelector);
  const isInitial = useSelector(isInitialSelector);

  if (isInitial) return <Loader />;

  return (
    <ListContentLayout
      title="Заказы"
      header={<FiltersWithPortal />}
      content={<OrdersListTable ordersList={ordersList} />}
      footer={(
        <Paginator
          onPageChange={onPageChange}
          pageCount={totalPages}
          initialPage={initialPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
        />
      )}
    />
  );
}

export default OrdersList;
