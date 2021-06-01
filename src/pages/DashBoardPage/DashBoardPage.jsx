import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aside from '../../components/Aside/Aside';
import DashBoardLayout from '../../components/DashBoardLayout/DashBoardLayout';
import DashBoardRouter from '../../components/DashBoardRouter/DashBoardRouter';
import Footer from '../../components/Footer/Footer';
import TopBar from '../../components/TopBar/TopBar';
import { isAuthSelector } from '../../redux/auth/selectors';
import appRoutes from '../../routes/appRoutes';

function DashBoardPage() {
  // const dispatch = useDispatch();
  const isAuth = useSelector(isAuthSelector);
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
