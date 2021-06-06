import { Redirect, Route, Switch } from 'react-router-dom';
import appRoutes from '../../routes/appRoutes';
import OrderEdit from '../OrderEdit/OrderEdit';
import Orders from '../Orders/Orders';

function DashBoardRouter() {
  return (
    <Switch>
      <Route
        path={appRoutes.dashboard()}
        exact
        render={() => <Redirect to={appRoutes.dashboardOrders()} />}
      />
      <Route path={appRoutes.dashboardOrders()} render={() => <Orders />} />
      <Route path={appRoutes.dashboardOrder(':id')} render={() => <OrderEdit />} />
      <Route path={appRoutes.dashboardCars()} render={() => <div>Cars</div>} />
      <Route path={`${appRoutes.dashboard()}/*`} render={() => <Redirect to={appRoutes.dashboardOrders()} />} />
    </Switch>
  );
}

export default DashBoardRouter;
