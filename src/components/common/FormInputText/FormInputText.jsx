import { Field } from 'formik';
import s from './FormInputText.module.scss';

function FormInputText(props) {
  const {
    label = 'label',
    placeholder,
    type = 'text',
    name,
  } = props;
  return (
    <div className={s.root}>
      <label className={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <Field className={s.input} name={name} id={label} placeholder={placeholder} type={type} />
      </label>
    </div>
  );
}

export default FormInputText;
