/* eslint-disable object-curly-newline */
import { Link } from 'react-router-dom';
import appRoutes from '../../../routes/appRoutes';
import s from './OrdersListTable.module.scss';

function MainInfo(props) {
  const {
    carModel, carColor, cityName, adress, dateFrom, dateTo, picture,
  } = props;
  return (
    <div className={s.mainInfo} style={{ backgroundImage: `url(${picture})` }}>
      <span className={s.mainInfo__line}>
        <span className={s.mainInfo_accent}>{`${carModel} `}</span>
        в
        <span className={s.mainInfo_accent}>{` ${cityName} `}</span>
        {adress}
      </span>
      <span className={s.mainInfo__line}>
        {`${dateFrom} — ${dateTo}`}
      </span>
      <span className={s.mainInfo__line}>
        Цвет:
        <span className={s.mainInfo_accent}>{` ${carColor}`}</span>
      </span>
    </div>
  );
}

function Options(props) {
  const { isFullTank, isNeedChildChair, isRightWheel } = props;
  return (
    <div className={s.option_wrapper}>
      <span className={`${s.option} ${isFullTank && s.option_active}`}>
        Полный бак
      </span>
      <span className={`${s.option} ${isNeedChildChair && s.option_active}`}>
        Детское кресло
      </span>
      <span className={`${s.option} ${isRightWheel && s.option_active}`}>
        Правый руль
      </span>
    </div>
  );
}

function Price({ price }) {
  return (
    <div className={s.price}><span>{price}</span></div>
  );
}

function ButtonsAction({ id }) {
  return (
    <div className={s.buttons__wrap}>
      <button className={`${s.buttons__btn} ${s.buttons__btn_confirm}`} type="button">
        <span>Готово</span>
      </button>
      <button className={`${s.buttons__btn} ${s.buttons__btn_cancel}`} type="button">
        <span>Отмена</span>
      </button>
      <Link
        to={appRoutes.dashboardOrder(id)}
        className={`${s.buttons__btn} ${s.buttons__btn_change}`}
      >
        <span>Изменить</span>
      </Link>
    </div>
  );
}

function OrdersListTable({ ordersList }) {
  return (
    <ul className={s.orders__list}>
      {ordersList.map(({ id, mainInfo, options, price }) => (
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
