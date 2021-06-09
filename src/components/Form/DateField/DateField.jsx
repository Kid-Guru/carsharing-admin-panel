/* eslint-disable jsx-a11y/label-has-associated-control */
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import s from './DateField.module.scss';
import 'react-datepicker/dist/react-datepicker.css';
import './DataPickerStyles.scss';

function DateField(props) {
  const { label, placeholder } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <DatePicker
          {...field}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => setFieldValue(field.name, val.getTime())}
          id={label}
          className="dpStyles"
          clearButtonClassName="dpStyles__clear"
          placeholderText={placeholder}
          // locale="ru"
          // minDate={new Date()}
          // maxDate={dateTo}
          // filterTime={filterTimeFrom}
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
