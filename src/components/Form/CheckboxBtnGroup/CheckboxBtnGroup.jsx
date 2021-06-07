import s from './CheckboxBtnGroup.module.scss';

function CheckboxBtnGroup(props) {
  const { title, items } = props;
  return (
    <fieldset className={s.checkbox}>
      <legend className={s.checkbox__title}>{title}</legend>
      <div className={s.checkbox__container}>

        {items.map((elem) => (
          <label key={elem.id} className={s.checkbox__label} htmlFor={elem.text}>
            <input className={s.checkbox__input} name={title} id={elem.text} type="checkbox" />
            <span className={s.checkbox__icon} role="presentation" />
            <span className={s.checkbox__text}>{elem.text}</span>
          </label>
        ))}

      </div>
    </fieldset>
  );
}

export default CheckboxBtnGroup;
