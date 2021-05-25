import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashBoardLayout from '../../components/DashBoardLayout/DashBoardLayout';
import TopBar from '../../components/TopBar/TopBar';
import Aside from '../../components/Aside/Aside';
import Footer from '../../components/Footer/Footer';
import appRoutes from '../../routes/appRoutes';

function DashBoardPage() {
  // const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Redirect to={appRoutes.login()} />;
  }
  return (
    <DashBoardLayout topbar={<TopBar />} aside={<Aside />} footer={<Footer />} />
  );
}

export default DashBoardPage;
