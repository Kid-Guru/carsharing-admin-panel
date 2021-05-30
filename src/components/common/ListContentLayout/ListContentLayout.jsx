// import Box from '../Box/Box';
import s from './ListContentLayout.module.scss';

function ListContentLayout(props) {
  const { content, header, footer } = props;

  return (
    <article className={s.listContentLayout}>
      <h2 className={s.listContentLayout__title}>Заголовок</h2>
      <div className={s.listContentLayout__wrapper}>
        <div className={s.listContentLayout__filters}>
          {header}
        </div>
        <div className={s.listContentLayout__content}>
          {content}
        </div>
        <div className={s.listContentLayout__footer}>
          {footer}
        </div>
      </div>
    </article>
  );
}

export default ListContentLayout;