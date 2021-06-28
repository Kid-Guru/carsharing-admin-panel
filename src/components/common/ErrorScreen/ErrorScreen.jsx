import { useHistory } from 'react-router-dom';
import Button from '../Buttons/Button';
import s from './ErrorScreen.module.scss';

function ErrorScreen(props) {
  const { text = 'Попробуйте перезагрузить страницу' } = props;
  const history = useHistory();
  const onClickHandle = () => history.goBack();
  return (
    <div className={s.errorScreen}>
      <div className={s.errorScreen__wrapper}>
        <p className={s.errorScreen__title}>Что-то пошло не так</p>
        <p className={s.errorScreen__text}>{text}</p>
        <Button text="Назад" onClick={onClickHandle} />
      </div>
    </div>
  );
}

export default ErrorScreen;
