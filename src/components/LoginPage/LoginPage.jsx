import Box from '../common/Box/Box';
import FormInputText from '../common/FormInputText/FormInputText';
import Link from '../common/Link/Link';
import ButtonSubmit from '../common/ButtonSubmit/ButtonSubmit';
import s from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={s.login__wrapper}>
      <h1 className={s.title}>Need for drive</h1>
      <Box>
        <form className={s.login__form} action="submit">
          <h2 className={s.login__title}>Вход</h2>
          <FormInputText label="Почта" placeholder="Введите почту" type="email" />
          <FormInputText label="Пароль" placeholder="Введите пароль" type="password" />
          <p className={s.login__footer}>
            <Link text="Запросить доступ" href="https://gist.github.com/internship-simbirsoft/3d634f32072b1e8514fc9fb19f88acdd" />
            <ButtonSubmit text="Войти" />
          </p>
        </form>
      </Box>
    </div>
  );
}

export default LoginPage;
