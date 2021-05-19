import s from './Link.module.scss';

function Link(props) {
  const { text, href } = props;
  return (
    <a className={s.link} href={href} target="_blank" rel="noreferrer">{text}</a>
  );
}

export default Link;
