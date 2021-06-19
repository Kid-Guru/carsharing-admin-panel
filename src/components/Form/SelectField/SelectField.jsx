import { Field, useField } from 'formik';
import Select, { components } from 'react-select';
import { ReactComponent as Dropdown } from '../../../assets/images/dropdownSearchField.svg';
import s from './SelectField.module.scss';

const { DropdownIndicator } = components;

const customStyles = {
  container: (provided) => ({
    ...provided,
    display: 'inline-block',
    height: '30px',
    width: '100%',
    marginRight: '10px',
  }),
  control: (provided, state) => ({
    ...provided,
    minHeight: '30px',
    height: '30px',
    boxShadow: 'none',
    // eslint-disable-next-line no-nested-ternary
    border: state.selectProps.isError ? '1px solid #C4183C'
      : state.isFocused ? '1px solid #BECAD6' : '1px solid #BECAD6',
    '&: hover': {
      border: '1px solid #121212',
    },
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
  const isError = !!(form.touched[field.name] && form.errors[field.name]);
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
      onChange={(option) => {
        form.setFieldTouched(field.name, true);
        form.setFieldValue(field.name, option && option.value);
      }}
      isError={isError}
    />
  );
}

function SelectField(props) {
  const {
    label = 'label',
    placeholder,
    options,
    name,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [_, meta] = useField({ name });
  const isError = meta.touched && meta.error;
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <Field
          name={name}
          id={label}
          placeholder={placeholder}
          component={SelectComponent}
          options={options}
        />
      </label>
      <span className={`${s.errorMessage} ${isError && s.errorMessage_active}`}>{meta.error}</span>
    </div>
  );
}

export default SelectField;
