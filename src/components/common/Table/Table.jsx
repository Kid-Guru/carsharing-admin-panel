import { Link } from 'react-router-dom';
import s from './Table.module.scss';

function Table(props) {
  const {
    headers, content, linkBtnNew, linkBtnEdit,
  } = props;
  return (
    <div className={s.table__wrapper}>
      <table className={s.table__root}>
        <thead className={s.table__head}>
          <tr className={s.table__head_row}>
            <th className={s.table__head_cell} style={{ width: '80px' }}>
              <Link className={`${s.btnLink} ${s.btnLink__new}`} to={linkBtnNew()} />
            </th>

            {headers.map(({ title, width }) => (
              <th key={title} className={s.table__head_cell} style={{ width }}>{title}</th>
            ))}

          </tr>
        </thead>
        <tbody className={s.table__body}>

          {content.map((c) => (
            <tr key={c.id} className={s.table__body_row}>
              <td className={s.table__body_cell}>
                <Link className={`${s.btnLink} ${s.btnLink__edit}`} to={linkBtnEdit(c.id)} />
              </td>

              { /* eslint-disable-next-line react/no-array-index-key */ }
              {c.row.map((cell, i) => <td key={i} className={s.table__body_cell}>{cell}</td>)}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
