import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select, { components } from 'react-select';
import avatarStub from '../../assets/images/avatarStub.svg';
import { ReactComponent as BellIcon } from '../../assets/images/bellIcon.svg';
import { ReactComponent as Dropdown } from '../../assets/images/dropdown.svg';
import signOutIcon from '../../assets/images/signOut.svg';
import { logout } from '../../redux/auth/actions';
import Aside from '../Aside/Aside';
import SidePortal from '../common/SidePortal/SidePortal';
import s from './TopBar.module.scss';

const { DropdownIndicator } = components;

const options = [{
  label: 'ВЫХОД', callBack: logout, icon: signOutIcon, value: 'ВЫХОД',
}];

const CustomDropdownIndicator = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DropdownIndicator {...props}>
    <Dropdown />
  </DropdownIndicator>
);

const formatOptionLabel = ({ label, icon, large }) => (
  <div className={s.formatOptionLabel}>
    {icon && (
      <span
        className={`${s.formatOptionLabel__icon} ${large && s.formatOptionLabel__icon_lg}`}
        style={{ backgroundImage: `url(${icon})` }}
      />
    )}
    <span className={s.formatOptionLabel__label}>{label}</span>
  </div>
);

const customSelectStyles = {
  container: (provided) => ({
    ...provided,
    width: '220px',
    '@media (max-width: 768px)': {
      ...provided['@media (max-width: 768px)'],
      width: '120px',
    },
  }),
  control: (provided) => ({
    ...provided,
    width: '100%',
    height: '100%',
    padding: '0 20px',
    border: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'all ease 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(134,142,150, 0.2)',
    },
    '@media (max-width: 768px)': {
      ...provided['@media (max-width: 768px)'],
      padding: '0',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    width: '220px',
    '@media (max-width: 768px)': {
      ...provided['@media (max-width: 768px)'],
      width: '120px',
    },
    marginTop: '0',
    borderRadius: '0',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '100%',
  }),
};

function TopBar() {
  const dispatch = useDispatch();
  const [isSideMenuOpen, toggleSideMenu] = useState(false);
  return (
    <>
      <SidePortal isOpen={isSideMenuOpen} closePortalCallback={() => toggleSideMenu(false)}>
        <Aside closePortalCallback={() => toggleSideMenu(false)} />
      </SidePortal>
      <div className={s.topBar}>
        <button className={s.showSideMenu} onClick={() => toggleSideMenu(true)} type="button">
          <div className={s.showSideMenu__wrap}>
            <span className={s.showSideMenu__line} />
            <span className={s.showSideMenu__line} />
            <span className={s.showSideMenu__line} />
          </div>
        </button>
        <div className={s.topBar__search}>
          <label className={s.search__label} htmlFor="search">
            <span className={s.search__icon} />
            <input
              className={s.search__field}
              name="search"
              id="search"
              placeholder="Поиск ..."
              type="text"
              autoCorrect="off"
              autoComplete="off"
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
          styles={customSelectStyles}
          components={{ DropdownIndicator: CustomDropdownIndicator }}
          formatOptionLabel={formatOptionLabel}
          onChange={({ callBack }) => dispatch(callBack())}
          options={options}
          value={{
            label: 'Admin', icon: avatarStub, value: 'Admin', large: true,
          }}
          classNamePrefix="select"
        />
      </div>
    </>
  );
}

export default TopBar;
