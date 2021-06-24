import React from 'react';
import Aside from '../../components/Aside/Aside';
import DashBoardRouter from '../../components/DashBoardRouter/DashBoardRouter';
import Footer from '../../components/Footer/Footer';
import MessageBar from '../../components/MessageBar/MessageBar';
import TopBar from '../../components/TopBar/TopBar';
import s from './DashBoardPage.module.scss';

function DashBoardPage() {
  return (
    <div className={s.layout__container}>
      <div className={s.layout__aside}>
        <Aside />
      </div>
      <div className={s.layout__topbar}>
        <TopBar />
        <MessageBar />
      </div>
      <div className={s.layout__article}>
        <DashBoardRouter />
      </div>
      <div className={s.layout__footer}>
        <Footer />
      </div>
    </div>
  );
}

export default DashBoardPage;
