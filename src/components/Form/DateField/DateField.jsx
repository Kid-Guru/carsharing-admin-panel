/* eslint-disable jsx-a11y/label-has-associated-control */
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateField(props) {
  const { label, placeholder } = props;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <div className="dateField">
      <label className="dateField__label" htmlFor={label}>
        <span className="dateField__label-text">{label}</span>
        <DatePicker
          {...field}
          selected={(field.value && new Date(field.value)) || null}
          onChange={(val) => {
            setFieldValue(field.name, val);
          }}
          id={label}
          className="dateField__input"
          clearButtonClassName="dateField__clear"
          placeholderText={placeholder}
          // locale="ru"
          // selected={dateFrom}
          // onChange={(date) => selectDateFrom(date)}
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
