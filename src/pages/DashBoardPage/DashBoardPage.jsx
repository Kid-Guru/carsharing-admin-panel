import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashBoardLayout from '../../components/DashBoardLayout/DashBoardLayout';
import Header from '../../components/Header/Header';
import Aside from '../../components/Aside/Aside';
import appRoutes from '../../routes/appRoutes';

function DashBoardPage() {
  // const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Redirect to={appRoutes.login()} />;
  }
  return (
    <DashBoardLayout header={<Header />} aside={<Aside />} />
  );
}

export default DashBoardPage;
