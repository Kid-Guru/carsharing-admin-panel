import {
  Redirect, Route, Switch, useLocation,
} from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import s from './App.module.scss';
import DashBoardPage from './pages/DashBoardPage/DashBoardPage';
import LoginPage from './pages/LoginPage/LoginPage';
import appRoutes from './routes/appRoutes';

function App() {
  const location = useLocation();
  return (
    <div className={s.app}>
      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
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
              render={() => <Redirect to={appRoutes.login()} />}
            />
            <Route path={appRoutes.login()} render={() => <LoginPage />} />
            <Route path={appRoutes.dashboard()} render={() => <DashBoardPage />} />
            <Route path="/*" render={() => <Redirect to={appRoutes.dashboard()} />} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
