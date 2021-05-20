import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Login from '../../components/Login/Login';
import { login } from '../../redux/auth/actions';

function LoginPage() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (isAuth) {
    return <Redirect to="/admin-panel" />;
  }
  return (
    <Login onSubmitHandle={(payload) => dispatch(login(payload))} />
  );
}

export default LoginPage;
