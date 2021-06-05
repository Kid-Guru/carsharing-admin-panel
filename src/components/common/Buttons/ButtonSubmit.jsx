import s from './Button.module.scss';

function ButtonSubmit(props) {
  const { text, disabled } = props;
  return (
    <button className={s.button} type="submit" disabled={disabled}>{text}</button>
  );
}

export default ButtonSubmit;
