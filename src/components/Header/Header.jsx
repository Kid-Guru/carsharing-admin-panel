import Select from 'react-select';
import { ReactComponent as BellIcon } from '../../assets/images/bellIcon.svg';
import { ReactComponent as Dropdown } from '../../assets/images/dropdown.svg';
import s from './Header.module.scss';

const DropdownIndicator = () => <div className={s.dropdown}><Dropdown /></div>;
const Placeholder = () => (
  <div className={s.placeholder}>
    <span className={s.placeholder__nickname}>Admin</span>
  </div>
);

function Header() {
  // const {  } = props;
  return (
    <header className={s.header}>
      <div className={s.header__search}>
        <label className={s.search__label} htmlFor="search">
          <span className={s.search__icon} />
          <input
            className={s.search__field}
            name="search"
            id="search"
            placeholder="Поиск ..."
            type="text"
          />
        </label>
      </div>
      <button className={s.showNotify} type="button">
        <BellIcon />
        <span className={s.showNotify__counter}>3</span>
      </button>
      <Select
        isSearchable={false}
        className={s.select}
        components={{ Placeholder, DropdownIndicator }}
      // classNamePrefix="locationField__input"
      // inputId="orderPoint"
      // placeholder="Начните вводить пункт"
      // value={pointOrder.value === '' ? null : ({ value: pointOrder.value, label: pointOrder.value })}
      // onChange={(input) => onChangePointHandle(input === null ? '' : input.value)}
      // options={optionsPoints}
      />
    </header>
  );
}

export default Header;
