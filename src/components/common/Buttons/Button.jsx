import s from './Button.module.scss';

const colorMap = {
  primary: s.primaryStyle,
  secondary: s.secondaryStyle,
  alert: s.alertStyle,
};

function Button(props) {
  const {
    text, disabled, onClick, color,
  } = props;
  return (
    <button
      className={`${s.button} ${colorMap[color] || colorMap.primary}`}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
