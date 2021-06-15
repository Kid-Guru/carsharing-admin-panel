import s from './Button.module.scss';

function ButtonSubmit(props) {
  const { text, disabled, onClick } = props;
  return (
    <button
      className={`${s.button} ${s.primaryStyle}`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {text}
    </button>
  );
}

export default ButtonSubmit;
