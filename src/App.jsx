import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/login" />} />
        <Route path="/login" render={() => <LoginPage />} />
        <Route path="/admin-panel" render={() => <div>Ура мы залогинены</div>} />
        <Route path="/*" render={() => <Redirect to="/admin-panel" />} />
      </Switch>
    </div>
  );
}

export default App;
