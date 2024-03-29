/* eslint-disable jsx-a11y/label-has-associated-control */
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import s from './DateField.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './DataPickerStyles.scss';

function DateField(props) {
  const {
    label, placeholder, minDate, maxDate, filterTime = (time) => time,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <DatePicker
          {...field}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => setFieldValue(field.name, val && val.getTime())}
          id={label}
          wrapperClassName="dpStyles__wrapper"
          className="dpStyles__input"
          clearButtonClassName="dpStyles__clear"
          placeholderText={placeholder}
          minDate={minDate}
          maxDate={maxDate}
          filterTime={filterTime}
          showTimeSelect
          isClearable
          dateFormat="dd.MM.yyyy HH:mm "
          onFocus={(e) => { e.target.readOnly = true; }}
        />
      </label>
    </div>
  );
}

export default DateField;
