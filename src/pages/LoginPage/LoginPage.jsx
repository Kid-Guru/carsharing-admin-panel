import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import Login from '../../components/Login/Login';
import { login } from '../../redux/auth/actions';
import { isAuthSelector } from '../../redux/auth/selectors';
import appRoutes from '../../routes/appRoutes';

function LoginPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const redirectRoute = location.state?.from || { pathname: appRoutes.dashboardOrders() };
  const isAuth = useSelector(isAuthSelector);
  if (isAuth) {
    return <Redirect to={redirectRoute} />;
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
