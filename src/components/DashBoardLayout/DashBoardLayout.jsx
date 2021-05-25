import s from './DashBoardLayout.module.scss';

function DashBoardLayout(props) {
  const { topbar, aside, footer } = props;
  return (
    <div className={s.layout__container}>
      <div className={s.layout__aside}>{aside}</div>
      <div className={s.layout__topbar}>{topbar}</div>
      <div className={s.layout__article}>article</div>
      <div className={s.layout__footer}>{footer}</div>
    </div>
  );
}

export default DashBoardLayout;
