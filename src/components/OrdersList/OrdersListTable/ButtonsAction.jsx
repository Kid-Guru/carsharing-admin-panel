import { Link } from 'react-router-dom';
import appRoutes from '../../../routes/appRoutes';
import s from './OrdersListTable.module.scss';

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

export default ButtonsAction;
