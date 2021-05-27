import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashBoardLayout from '../../components/DashBoardLayout/DashBoardLayout';
import TopBar from '../../components/TopBar/TopBar';
import Aside from '../../components/Aside/Aside';
import Footer from '../../components/Footer/Footer';
import appRoutes from '../../routes/appRoutes';
import ListContentLayout from '../../components/common/ListContentLayout/ListContentLayout';

function DashBoardPage() {
  // const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Redirect to={appRoutes.login()} />;
  }
  return (
    <DashBoardLayout
      topbar={<TopBar />}
      content={<ListContentLayout />}
      aside={<Aside />}
      footer={<Footer />}
    />
  );
}

export default DashBoardPage;
