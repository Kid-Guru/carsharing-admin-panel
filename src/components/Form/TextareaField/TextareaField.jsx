import { Field, useField } from 'formik';
import s from './TextareaField.module.scss';

function TextareaField(props) {
  const {
    label = 'label',
    placeholder,
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
          type="text"
          className={`${s.input} ${isError && s.input_error}`}
          id={label}
          placeholder={placeholder}
          component="textarea"
          rows="6"
          autoCorrect="off"
          autoComplete="off"
        />
      </label>
      <span className={`${s.errorMessage} ${isError && s.errorMessage_active}`}>{meta.error}</span>
    </div>
  );
}

export default TextareaField;
