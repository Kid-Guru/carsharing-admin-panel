import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Box from '../../components/common/Box/Box';
import appRoutes from '../../routes/appRoutes';

function DashBoardPage() {
  // const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  if (!isAuth) {
    return <Redirect to={appRoutes.login()} />;
  }
  return (
    <Box>
      Ура мы залогинены
    </Box>
  );
}

export default DashBoardPage;
