import s from './Box.module.scss';

function Box(props) {
  const { children } = props;
  return (
    <div className={s.box}>{children}</div>
  );
}

export default Box;
