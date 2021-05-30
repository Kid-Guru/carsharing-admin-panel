import ReactPaginate from 'react-paginate';
import s from './Paginator.module.scss';

function Paginator(props) {
  return (
    <div className={s.wrapper}>
      <ReactPaginate
        {...props}
        containerClassName={s.pagination}
        pageClassName={s.item}
        breakClassName={s.item}
        previousClassName={s.item}
        nextClassName={s.item}
        activeClassName={s.item__active}
        pageLinkClassName={s.item__link}
        breakLinkClassName={s.item__break}
        previousLinkClassName={s.item__side}
        nextLinkClassName={s.item__side}
        previousLabel="«"
        nextLabel="»"
      />
    </div>

  );
}

export default Paginator;
