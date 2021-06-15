import { useField } from 'formik';
import s from './CheckboxBtnGroup.module.scss';

function Checkbox({ elem }) {
  // eslint-disable-next-line no-unused-vars
  const [field, _, helpers] = useField({ name: elem.name, type: 'checkbox' });
  return (
    <label className={s.checkbox__label} htmlFor={elem.text}>
      <input
        {...field}
        onChange={() => {
          helpers.setTouched(true);
          helpers.setValue(!field.value);
        }}
        name={elem.name}
        className={s.checkbox__input}
        id={elem.text}
      />
      <span className={s.checkbox__icon} role="presentation" />
      <span className={s.checkbox__text}>{elem.text}</span>
    </label>
  );
}

function CheckboxBtnGroup(props) {
  const { title, items } = props;
  return (
    <fieldset className={s.checkbox}>
      <legend className={s.checkbox__title}>{title}</legend>
      <div className={s.checkbox__container}>
        {items.map((elem) => <Checkbox key={elem.text} elem={elem} />)}
      </div>
    </fieldset>
  );
}

export default CheckboxBtnGroup;
