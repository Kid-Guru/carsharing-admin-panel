import s from './ButtonSubmit.module.scss';

function ButtonSubmit(props) {
  const { text, onClickHandle } = props;
  return (
    <button className={s.button} onClick={onClickHandle} type="submit">{text}</button>
  );
}

export default ButtonSubmit;
