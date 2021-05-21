import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../../components/Login/Login';
import { login } from '../../redux/auth/actions';
import appRoutes from '../../routes/appRoutes';

function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Redirect to={appRoutes.dashboard()} />;
  }
  return (
    <Login
      onSubmitHandle={(payload, { setErrors: setErrorsForm, setSubmitting }) => {
        dispatch(login(payload, setErrorsForm, setSubmitting));
      }}
    />
  );
}

export default LoginPage;