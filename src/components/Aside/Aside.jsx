import { NavLink } from 'react-router-dom';
import { ReactComponent as ListOrders } from '../../assets/images/listOrders.svg';
import { ReactComponent as ListAuto } from '../../assets/images/listAuto.svg';
import s from './Aside.module.scss';

function Aside() {
  // const dispatch = useDispatch();
  return (
    <aside className={s.aside}>
      <header className={s.header}>
        <h1 className={s.header__title}>Need for drive</h1>
      </header>
      <nav className={s.navigation}>
        <ul className={s.navigation__list}>
          <li className={s.navigation__listItem}>
            <NavLink to="/dashboard/1" activeClassName={s.active}>
              <span className={s.navigation__icon}><ListOrders /></span>
              <span className={s.navigation__linkText}>Заказы</span>
            </NavLink>
          </li>
          <li className={s.navigation__listItem}>
            <NavLink to="/faq" activeClassName="active">
              <span className={s.navigation__icon}><ListAuto /></span>
              <span className={s.navigation__linkText}>Список авто</span>
            </NavLink>
          </li>
          <li className={s.navigation__listItem}>
            <NavLink to="/faq" activeClassName="active">
              <span className={s.navigation__icon}><ListAuto /></span>
              <span className={s.navigation__linkText}>Text bla bla</span>
            </NavLink>
          </li>

        </ul>
      </nav>

    </aside>
  );
}

export default Aside;
