import s from './OrdersList.module.scss';

function MainInfo() {
  return (
    <div className={s.mainInfo} style={{ backgroundImage: 'url(https://api-factory.simbirsoft1.com/files/601c54bead015e0bb6997f4d_5f21d9459d3a610b850fcd57_5ea9e5f3099b810b946c7234_97cfab8f5d3e6e963d8183e5ad70e734.png)' }}>
      <span className={s.mainInfo__line}>
        <span className={s.mainInfo_accent}>ELANTRA</span>
        в
        <span className={s.mainInfo_accent}>Ульяновск, </span>
        Нариманова 42
      </span>
      <span className={s.mainInfo__line}>
        12.06.2019 12:00 — 13.06.2019 12:00
      </span>
      <span className={s.mainInfo__line}>
        Цвет:
        <span className={s.mainInfo_accent}>Голубой</span>
      </span>
    </div>
  );
}

function Options() {
  return (
    <div className={s.option_wrapper}>
      <span className={`${s.option} ${s.option_active}`}>
        Полный бак
      </span>
      <span className={s.option}>
        Детское кресло
      </span>
      <span className={s.option}>
        Правый руль
      </span>
    </div>
  );
}

function Price() {
  return (
    <div className={s.price}><span>34234</span></div>
  );
}

function ButtonsAction() {
  return (
    <div className={s.buttons__wrap}>
      <button className={`${s.buttons__btn} ${s.buttons__btn_confirm}`} type="button">
        <span>Готово</span>
      </button>
      <button className={`${s.buttons__btn} ${s.buttons__btn_cancel}`} type="button">
        <span>Отмена</span>
      </button>
      <button className={`${s.buttons__btn} ${s.buttons__btn_change}`} type="button">
        <span>Изменить</span>
      </button>
    </div>
  );
}

function OrdersList() {
  return (
    <ul className={s.orders__list}>
      <li className={`${s.orders__item} ${s.order}`}>
        <div className={s.order__col}>
          <MainInfo />
        </div>
        <div className={s.order__col}>
          <Options />
        </div>
        <div className={s.order__col}>
          <Price />
        </div>
        <div className={s.order__col}>
          <ButtonsAction />
        </div>
      </li>
      <li className={`${s.orders__item} ${s.order}`}>
        <div className={s.order__col}>
          <MainInfo />
        </div>
        <div className={s.order__col}>
          <Options />
        </div>
        <div className={s.order__col}>
          <Price />
        </div>
        <div className={s.order__col}>
          <ButtonsAction />
        </div>
      </li>
    </ul>
  );
}

export default OrdersList;
