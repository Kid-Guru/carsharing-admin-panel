import s from './DashBoardLayout.module.scss';

function DashBoardLayout(props) {
  const { header  } = props;
  return (
    <div className={s.layout__container}>
      <div className="layout__aside">aside</div>
      <div className="layout__header">{header}</div>
      <div className="layout__article">article</div>
      <div className="layout__footer">footer</div>
    </div>
  );
}

export default DashBoardLayout;
