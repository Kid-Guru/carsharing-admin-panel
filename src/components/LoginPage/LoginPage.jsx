import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Box from '../common/Box/Box';
import ButtonSubmit from '../common/ButtonSubmit/ButtonSubmit';
import FormInputText from '../common/FormInputText/FormInputText';
import Link from '../common/Link/Link';
import { login } from '../../redux/auth/actions';
import s from './LoginPage.module.scss';

function LoginPage() {
  const [isShowing, setShowing] = useState(false);
  useEffect(() => {
    setShowing(true);
  }, []);
  const dispatch = useDispatch();
  return (
    <CSSTransition
      in={isShowing}
      timeout={300}
      classNames={{
        enter: s.transitionEnter,
        enterActive: s.transitionEnterActive,
        // exitActive: s.transitionExitActive,
        // exit: s.transitionExit,
      }}
      unmountOnExit
    >
      <div className={s.login__wrapper}>
        <h1 className={s.title}>Need for drive</h1>
        <Box>
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            onSubmit={(values) => {
              dispatch(login(values));
            }}
          >
            <Form className={s.login__form} action="submit">
              <h2 className={s.login__title}>Вход</h2>
              <FormInputText label="Почта" placeholder="Введите почту" type="text" name="login" />
              <FormInputText label="Пароль" placeholder="Введите пароль" type="password" name="password" />
              <p className={s.login__footer}>
                <Link text="Запросить доступ" href="https://gist.github.com/internship-simbirsoft/3d634f32072b1e8514fc9fb19f88acdd" />
                <ButtonSubmit text="Войти" />
              </p>
            </Form>
          </Formik>
        </Box>
      </div>
    </CSSTransition>
  );
}

export default LoginPage;
