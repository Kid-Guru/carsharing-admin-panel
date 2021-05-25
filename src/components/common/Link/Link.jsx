import s from './Link.module.scss';

function Link(props) {
  const { text, href, sizeSmall } = props;
  return (
    <a className={`${s.link} ${sizeSmall && s.link_sm}`} href={href} target="_blank" rel="noreferrer">{text}</a>
  );
}

export default Link;
