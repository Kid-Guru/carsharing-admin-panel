import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import s from './App.module.scss';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import appRoutes from './routes/appRoutes';

function App() {
  const location = useLocation();
  const firstPathRoute = location.pathname.split('/')[1];
  return (
    <div className={s.app}>
      <TransitionGroup component={null}>
        <CSSTransition
          key={firstPathRoute}
          classNames={{
            enter: s.routeEnter,
            enterActive: s.routeEnterActive,
          }}
          timeout={300}
        >
          <Switch location={location}>
            <Route
              path={appRoutes.root()}
              exact
              render={() => <Redirect to={appRoutes.dashboard()} />}
            />
            <Route path={appRoutes.login()} render={() => <LoginPage />} />
            <PrivateRoute path={appRoutes.dashboard()}>
              <DashBoardPage />
            </PrivateRoute>
            <Route path="/*" render={() => <Redirect to={appRoutes.dashboard()} />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
