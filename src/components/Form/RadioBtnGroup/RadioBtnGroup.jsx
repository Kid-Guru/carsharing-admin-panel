import { Field } from 'formik';
import s from './RadioBtnGroup.module.scss';

function RadioBtnGroup(props) {
  const { title, items, name } = props;
  return (
    <fieldset className={s.radio}>
      <legend className={s.radio__title}>{title}</legend>
      <div className={s.radio__container}>

        {items.map((elem) => (
          <label key={elem} className={s.radio__label} htmlFor={elem}>
            <Field name={name} className={s.radio__input} id={elem} type="radio" value={elem} />
            <span className={s.radio__icon} role="presentation" />
            <span className={s.radio__text}>{elem}</span>
          </label>
        ))}

      </div>
    </fieldset>
  );
}

export default RadioBtnGroup;
