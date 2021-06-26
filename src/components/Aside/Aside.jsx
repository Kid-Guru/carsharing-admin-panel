import { NavLink } from 'react-router-dom';
import { ReactComponent as ListAuto } from '../../assets/images/listAuto.svg';
import { ReactComponent as ListOrders } from '../../assets/images/listOrders.svg';
import appRoutes from '../../routes/appRoutes';
import s from './Aside.module.scss';

const mapAside = [
  { title: 'Заказы', link: appRoutes.dashboardOrders(), icon: <ListOrders /> },
  { title: 'Машины', link: appRoutes.dashboardCars(), icon: <ListAuto /> },
  { title: 'Города', link: appRoutes.dashboardCities(), icon: <ListAuto /> },
  { title: 'Точки выдачи', link: appRoutes.dashboardPoints(), icon: <ListAuto /> },
];

function Aside(props) {
  const { closePortalCallback = () => null } = props;
  return (
    <aside className={s.aside}>
      <header className={s.header}>
        <h1 className={s.header__title}>Need for drive</h1>
      </header>
      <nav className={s.navigation}>
        <ul className={s.navigation__list}>

          {mapAside.map((item) => (
            <li className={s.navigation__listItem}>
              <NavLink
                to={item.link}
                activeClassName={s.active}
                onClick={closePortalCallback}
              >
                <span className={s.navigation__icon}>{item.icon}</span>
                <span className={s.navigation__linkText}>{item.title}</span>
              </NavLink>
            </li>
          ))}

        </ul>
      </nav>

    </aside>
  );
}

export default Aside;
