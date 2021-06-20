import { useFormikContext } from 'formik';
import { useHistory } from 'react-router-dom';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import appRoutes from '../../../routes/appRoutes';
import s from './Footer.module.scss';

function Footer() {
  const { submitForm } = useFormikContext();
  const history = useHistory();
  const handleBack = () => history.push(appRoutes.dashboardOrders());
  return (
    <div className={s.footer}>
      <div className={s.footer__col}>
        <span className={s.footer__btn}>
          <ButtonSubmit onClick={submitForm} text="Сохранить" />
        </span>
        <span className={s.footer__btn}>
          <Button onClick={handleBack} text="Назад" color="secondary" />
        </span>
      </div>
    </div>
  );
}

export default Footer;
