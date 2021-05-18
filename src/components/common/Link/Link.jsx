import s from './Link.module.scss';

function Link(props) {
  const { text, href } = props;
  return (
    <a className={s.link} href={href}>{text}</a>
  );
}

export default Link;
