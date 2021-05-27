import ReactPaginate from 'react-paginate';
import s from './Paginator.module.scss';

function Paginator() {
  // const {
  //   options, form, field, placeholder,
  // } = props;
  return (
    <div className={s.wrapper}>
      <ReactPaginate
        containerClassName={s.pagination}
        pageClassName={s.item}
        breakClassName={s.item}
        previousClassName={s.item}
        nextClassName={s.item}
        activeClassName={s.item__active}
        previousLabel="«"
        nextLabel="»"
      />
    </div>

  );
}

export default Paginator;
