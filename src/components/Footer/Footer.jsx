import Link from '../common/Link/Link';
import s from './Footer.module.scss';

function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.footer__left}>
        <Link text="Главная страница" href="https://kid-guru.github.io/carsharingApp" />
      </div>
      <div className={s.footer__right}>
        <span className={s.copyright}>Copyright © 2021 Simbirsoft</span>
      </div>
    </footer>
  );
}

export default Footer;
