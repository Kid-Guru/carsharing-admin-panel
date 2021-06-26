import { Redirect, Route, Switch } from 'react-router-dom';
import appRoutes from '../../routes/appRoutes';
import CarEdit from '../CarEditOrNew/CarEdit';
import CarNew from '../CarEditOrNew/CarNew';
import CarsList from '../CarsList/CarsList';
import CitiesList from '../Cities/CitiesList';
import OrderEdit from '../OrderEdit/OrderEdit';
import OrdersList from '../OrdersList/OrdersList';

function DashBoardRouter() {
  return (
    <Switch>
      <Route
        path={appRoutes.dashboard()}
        exact
        render={() => <Redirect to={appRoutes.dashboardOrders()} />}
      />
      <Route path={appRoutes.dashboardOrders()} render={() => <OrdersList />} />
      <Route path={appRoutes.dashboardOrder(':id')} render={({ match: { params } }) => <OrderEdit {...params} />} />
      <Route path={appRoutes.dashboardCars()} render={() => <CarsList />} />
      <Route path={appRoutes.dashboardCarEdit(':id')} render={({ match: { params } }) => <CarEdit {...params} />} />
      <Route path={appRoutes.dashboardCarNew()} render={() => <CarNew />} />
      <Route path={appRoutes.dashboardCities()} render={() => <CitiesList />} />
      <Route path={`${appRoutes.dashboard()}/*`} render={() => <Redirect to={appRoutes.dashboardOrders()} />} />
    </Switch>
  );
}

export default DashBoardRouter;
