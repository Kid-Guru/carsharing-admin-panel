import s from './OrdersListTable.module.scss';

function Options(props) {
  const { isFullTank, isNeedChildChair, isRightWheel } = props;
  return (
    <div className={s.option_wrapper}>
      <span className={`${s.option} ${isFullTank && s.option_active}`}>
        Полный бак
      </span>
      <span className={`${s.option} ${isNeedChildChair && s.option_active}`}>
        Детское кресло
      </span>
      <span className={`${s.option} ${isRightWheel && s.option_active}`}>
        Правый руль
      </span>
    </div>
  );
}

export default Options;
