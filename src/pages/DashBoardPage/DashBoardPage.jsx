import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aside from '../../components/Aside/Aside';
import DashBoardLayout from '../../components/DashBoardLayout/DashBoardLayout';
import DashBoardRouter from '../../components/DashBoardRouter/DashBoardRouter';
import Footer from '../../components/Footer/Footer';
import TopBar from '../../components/TopBar/TopBar';
import { isAuthSelector } from '../../redux/auth/selectors';
import appRoutes from '../../routes/appRoutes';

const MemoDashBoardPage = React.memo(
  // eslint-disable-next-line prefer-arrow-callback
  function DashBoardPage() {
    const isAuth = useSelector(isAuthSelector);
    if (!isAuth) {
      return <Redirect to={appRoutes.login()} />;
    }
    return (
      <DashBoardLayout
        topbar={<TopBar />}
        content={<DashBoardRouter />}
        aside={<Aside />}
        footer={<Footer />}
      />
    );
  },
);

export default MemoDashBoardPage;
