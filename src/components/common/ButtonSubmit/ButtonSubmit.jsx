import s from './ButtonSubmit.module.scss';

function ButtonSubmit(props) {
  const { text, onClickHandle, disabled } = props;
  return (
    <button className={s.button} onClick={onClickHandle} type="submit" disabled={disabled}>{text}</button>
  );
}

export default ButtonSubmit;
