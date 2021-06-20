import { Redirect, Route, Switch } from 'react-router-dom';
import appRoutes from '../../routes/appRoutes';
import CarEdit from '../CarEdit/CarEdit';
import CarsList from '../CarsList/CarsList';
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
      <Route path={appRoutes.dashboardCar(':id')} render={() => <CarEdit />} />
      <Route path={`${appRoutes.dashboard()}/*`} render={() => <Redirect to={appRoutes.dashboardOrders()} />} />
    </Switch>
  );
}

export default DashBoardRouter;
