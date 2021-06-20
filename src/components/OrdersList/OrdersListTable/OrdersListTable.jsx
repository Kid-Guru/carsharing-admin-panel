import ButtonsAction from './ButtonsAction';
import MainInfo from './MainInfo';
import Options from './Options';
import s from './OrdersListTable.module.scss';
import Price from './Price';

function OrdersListTable({ ordersList }) {
  return (
    <ul className={s.orders__list}>
      {ordersList.map(({
        id, mainInfo, options, price,
      }) => (
        <li key={id} className={`${s.orders__item} ${s.order}`}>
          <div className={`${s.order__col} ${s.order__col_mainInfo}`}>
            <MainInfo {...mainInfo} />
          </div>
          <div className={`${s.order__col} ${s.order__col_options}`}>
            <Options {...options} />
          </div>
          <div className={`${s.order__col} ${s.order__col_price}`}>
            <Price price={price} />
          </div>
          <div className={s.order__col}>
            <ButtonsAction id={id} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OrdersListTable;
