import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Box from '../common/Box/Box';
import ButtonSubmit from '../common/Buttons/ButtonSubmit/ButtonSubmit';
import FormInputText from '../common/FormInputText/FormInputText';
import Link from '../common/Link/Link';
import s from './Login.module.scss';

const validationSchema = yup.object().shape({
  login: yup.string().required('Поле обязательно'),
  password: yup.string().required('Поле обязательно'),
});

function Login(props) {
  const { onSubmitHandle } = props;
  return (
    <div className={s.login__outer}>
      <div className={s.login__wrapper}>
        <h1 className={s.title}>Need for drive</h1>
        <Box>
          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmitHandle}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form className={s.login__form} action="submit">
                <h2 className={s.login__title}>Вход</h2>
                <FormInputText label="Почта" placeholder="Введите почту" type="text" name="login" isError={touched.login && errors.login} errorText={errors.login} />
                <FormInputText label="Пароль" placeholder="Введите пароль" type="password" name="password" isError={touched.password && errors.password} errorText={errors.password} />
                <p className={s.login__footer}>
                  <Link text="Запросить доступ" href="https://gist.github.com/internship-simbirsoft/3d634f32072b1e8514fc9fb19f88acdd" sizeSmall />
                  <ButtonSubmit text="Войти" disabled={isSubmitting} />
                </p>
              </Form>
            )}
          </Formik>
        </Box>
      </div>
    </div>
  );
}

export default Login;
