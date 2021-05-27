import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashBoardLayout from '../../components/DashBoardLayout/DashBoardLayout';
import TopBar from '../../components/TopBar/TopBar';
import Aside from '../../components/Aside/Aside';
import Footer from '../../components/Footer/Footer';
import appRoutes from '../../routes/appRoutes';
// import Orders from '../../components/Orders/Orders';
import DashBoardRouter from '../../components/DashBoardRouter/DashBoardRouter';

function DashBoardPage() {
  // const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Redirect to={appRoutes.login()} />;
  }
  return (
    <DashBoardLayout
      topbar={<TopBar />}
      // content={<Orders />}
      content={<DashBoardRouter />}
      aside={<Aside />}
      footer={<Footer />}
    />
  );
}

export default DashBoardPage;
