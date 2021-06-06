import { Field } from 'formik';
import Select, { components } from 'react-select';
import { ReactComponent as Dropdown } from '../../../assets/images/dropdownSearchField.svg';
import s from './SelectField.module.scss';

const { DropdownIndicator } = components;

const customStyles = {
  container: (provided) => ({
    ...provided,
    display: 'inline-block',
    height: '30px',
    width: '180px',
    marginRight: '10px',
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
  valueContainer: (provided) => ({
    ...provided,
    height: '30px',
    padding: '0px 8px',
  }),
};

const CustomDropdownIndicator = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <DropdownIndicator {...props}>
    <Dropdown />
  </DropdownIndicator>
);

function SelectComponent(props) {
  const {
    options, form, field, placeholder,
  } = props;
  return (
    <Select
      classNamePrefix="react-select"
      isSearchable={false}
      styles={customStyles}
      components={{
        DropdownIndicator: CustomDropdownIndicator,
      }}
      placeholder={placeholder}
      options={options}
      value={options.find((option) => option.value === field.value && field.value !== null) || null}
      onChange={(option) => form.setFieldValue(field.name, option && option.value)}
    />
  );
}

function SelectField(props) {
  const {
    label = 'label',
    placeholder,
    options,
    name,
    isError,
    errorText = '',
  } = props;
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <Field
          className={`${s.input} ${isError && s.input_error}`}
          name={name}
          id={label}
          placeholder={placeholder}
          component={SelectComponent}
          options={options}
          autoCorrect="off"
          autoComplete="off"
        />
      </label>
      <span className={`${s.errorMessage} ${isError && s.errorMessage_active}`}>{errorText}</span>
    </div>
  );
}

export default SelectField;
