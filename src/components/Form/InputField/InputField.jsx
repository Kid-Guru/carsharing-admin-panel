import { useField } from 'formik';
import s from './InputField.module.scss';

function InputField(props) {
  const {
    label = 'label',
    placeholder,
    type = 'text',
    name,
  } = props;
  const [field, meta] = useField({ name, type });
  const isError = meta.touched && meta.error;
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <input
          {...field}
          className={`${s.input} ${isError && s.input_error}`}
          name={name}
          id={label}
          placeholder={placeholder}
          type={type}
          autoCorrect="off"
          autoComplete="off"
        />
      </label>
      <span className={`${s.errorMessage} ${isError && s.errorMessage_active}`}>{meta.error}</span>
    </div>
  );
}

export default InputField;
