import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanupOrders, initialOrdersRequest, setPageOrders,
} from '../../redux/orders/actions';
import {
  initialPageSelector,
  isInitialSelector, ordersSelector,
  totalOrdersSelector,
} from '../../redux/orders/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Paginator from '../common/Paginator/Paginator';
import Filters from './Filters/Filters';
import OrdersListTable from './OrdersListTable/OrdersListTable';

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
      header={<Filters />}
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
