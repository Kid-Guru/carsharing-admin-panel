import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { cleanupOrder, orderRequest, orderUpdate } from '../../redux/orderEdit/actions';
import { isFetchingSelector, isTrasferSeccuessSelector } from '../../redux/orderEdit/selectors';
import appRoutes from '../../routes/appRoutes';
import Button from '../common/Buttons/Button';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import s from './OrderEdit.module.scss';
import OrderEditForm from './OrderEditForm/OrderEditForm';

function Footer({ handleSave, handleBack }) {
  return (
    <div className={s.footer}>
      <span className={s.footer__btn}>
        <Button onClick={handleSave} text="Сохранить" color="primary" />
      </span>
      <span className={s.footer__btn}>
        <Button onClick={handleBack} text="Назад" color="secondary" />
      </span>
    </div>
  );
}

function OrderEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderRequest(id));
    return () => {
      dispatch(cleanupOrder());
    };
  }, [id, dispatch]);
  const formRef = useRef();
  const history = useHistory();
  const isFetching = useSelector(isFetchingSelector);
  const isTrasferSeccuess = useSelector(isTrasferSeccuessSelector);

  if (isFetching) return <Loader />;
  if (isTrasferSeccuess) return <Redirect to={appRoutes.dashboardOrders()} />;

  const handleBack = () => history.push(appRoutes.dashboardOrders());
  const submitRef = () => {
    if (formRef.current) formRef.current.handleSubmit();
  };
  const handleSubmit = (data) => dispatch(orderUpdate(data));
  return (
    <ListContentLayout
      title="Редактирование"
      header={`Заказ ${id}`}
      content={<OrderEditForm formRef={formRef} handleSubmit={handleSubmit} />}
      footer={<Footer handleSave={submitRef} handleBack={handleBack} />}
    />
  );
}

export default OrderEdit;
