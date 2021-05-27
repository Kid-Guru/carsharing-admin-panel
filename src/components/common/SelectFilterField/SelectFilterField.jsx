import Select, { components } from 'react-select';
import { ReactComponent as Dropdown } from '../../../assets/images/dropdownSearchField.svg';

const { DropdownIndicator } = components;

const customStyles = {
  container: (provided) => ({
    ...provided,
    display: 'inline-block',
    height: '30px',
    width: '110px',
    marginRight: '10px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '30px',
    padding: '0px 8px',
  }),
  control: (provided) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
  }),
  indicators: (provided) => ({
    ...provided,
    height: '30px',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: '30px',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  menu: (provided) => ({
    ...provided,
    marginTop: '2px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '13px',
    color: '#5A6169',
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '13px',
    color: '#5A6169',
  }),
  option: (provided) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '13px',
    color: '#5A6169',
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '13px',
    color: '#5A6169',
  }),
};

const CustomDropdownIndicator = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DropdownIndicator {...props}>
    <Dropdown />
  </DropdownIndicator>
);

function SelectFilter(props) {
  const {
    options, form, field, placeholder,
  } = props;
  return (
    <Select
      isSearchable={false}
      styles={customStyles}
      components={{ DropdownIndicator: CustomDropdownIndicator }}
      placeholder={placeholder}
      options={options}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
    />
  );
}

export default SelectFilter;
