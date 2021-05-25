import Link from '../common/Link/Link';
import s from './Footer.module.scss';

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footer__left}>
        <Link text="Главная страница" href="https://kid-guru.github.io/carsharingApp" />
        <Link text="Ссылка" href="https://gist.github.com/internship-simbirsoft/3d634f32072b1e8514fc9fb19f88acdd" />
      </div>
      <div className={s.footer__right}>
        <span className={s.copyright}>Copyright © 2021 Simbirsoft</span>
      </div>
    </footer>
  );
}

export default Footer;
