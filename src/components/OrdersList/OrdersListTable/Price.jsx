import s from './OrdersListTable.module.scss';

function Price({ price }) {
  return (
    <div className={s.price}><span>{price}</span></div>
  );
}

export default Price;
