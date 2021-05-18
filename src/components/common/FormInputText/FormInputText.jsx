import s from './FormInputText.module.scss';

function FormInputText(props) {
  const { label = 'label', placeholder, type = 'text' } = props;
  return (
    <div className={s.root}>
      <label classaName={s.label} htmlFor={label}>
        <span className={s.title}>{label}</span>
        <input className={s.input} id={label} placeholder={placeholder} type={type} />
      </label>
    </div>
  );
}

export default FormInputText;
