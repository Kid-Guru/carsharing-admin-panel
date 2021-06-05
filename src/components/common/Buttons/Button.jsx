import s from './Button.module.scss';

function Button(props) {
  const { text, disabled, onClick } = props;
  return (
    <button className={s.button} onClick={onClick} type="button" disabled={disabled}>{text}</button>
  );
}

export default Button;
