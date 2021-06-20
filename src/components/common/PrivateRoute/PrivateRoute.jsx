import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { checkTokens } from '../../../redux/auth/actions';
import { isAuthSelector, isCheckingAuthSelector } from '../../../redux/auth/selectors';
import Loader from '../Loader/Loader';
import appRoutes from '../../../routes/appRoutes';

function PrivateRoute({ children, path }) {
  const isAuth = useSelector(isAuthSelector);
  const isCheckingAuth = useSelector(isCheckingAuthSelector);
  const dispatch = useDispatch();

  useEffect(() => dispatch(checkTokens()), [dispatch]);

  if (isCheckingAuth) return <Loader />;
  return (
    <Route
      path={path}
      render={({ location }) => (isAuth ? children : (
        <Redirect
          to={{
            pathname: appRoutes.login(),
            state: { from: location },
          }}
        />
      ))}
    />
  );
}

export default PrivateRoute;
