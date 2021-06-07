import s from './RadioBtnGroup.module.scss';

function RadioBtnGroup(props) {
  const { title, items } = props;
  return (
    <fieldset className={s.radio}>
      <legend className={s.radio__title}>{title}</legend>
      <div className={s.radio__container}>

        {items.map((elem) => (
          <label key={elem.id} className={s.radio__label} htmlFor={elem.text}>
            <input className={s.radio__input} name={title} id={elem.text} type="radio" />
            <span className={s.radio__icon} role="presentation" />
            <span className={s.radio__text}>{elem.text}</span>
          </label>
        ))}

      </div>
    </fieldset>
  );
}

export default RadioBtnGroup;
