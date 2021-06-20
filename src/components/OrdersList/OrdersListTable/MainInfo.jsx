import s from './OrdersListTable.module.scss';

function MainInfo(props) {
  const {
    carModel, carColor, cityName, adress, dateFrom, dateTo, picture,
  } = props;
  return (
    <div className={s.mainInfo} style={{ backgroundImage: `url(${picture})` }}>
      <span className={s.mainInfo__line}>
        <span className={s.mainInfo_accent}>{`${carModel} `}</span>
        в
        <span className={s.mainInfo_accent}>{` ${cityName} `}</span>
        {adress}
      </span>
      <span className={s.mainInfo__line}>
        {`${dateFrom} — ${dateTo}`}
      </span>
      <span className={s.mainInfo__line}>
        Цвет:
        <span className={s.mainInfo_accent}>{` ${carColor}`}</span>
      </span>
    </div>
  );
}

export default MainInfo;
