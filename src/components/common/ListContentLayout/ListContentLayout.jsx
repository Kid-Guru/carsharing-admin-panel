import s from './ListContentLayout.module.scss';

function ListContentLayout(props) {
  const {
    title, content, header, footer,
  } = props;
  return (
    <article className={s.listContentLayout}>
      <h2 className={s.listContentLayout__title}>{title}</h2>
      <div className={s.listContentLayout__wrapper}>
        {header && (
        <div className={s.listContentLayout__filters}>
          {header}
        </div>
        )}
        <div className={s.listContentLayout__content}>
          {content}
        </div>
        {footer && (
          <div className={s.listContentLayout__footer}>
            {footer}
          </div>
        )}
      </div>
    </article>
  );
}

export default ListContentLayout;
