import { Field } from 'formik';
import s from './TextareaField.module.scss';

function TextareaField(props) {
  const {
    label = 'label',
    placeholder,
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
          component="textarea"
          rows="6"
          type="text"
          autoCorrect="off"
          autoComplete="off"
        />
      </label>
      <span className={`${s.errorMessage} ${isError && s.errorMessage_active}`}>{errorText}</span>
    </div>
  );
}

export default TextareaField;
