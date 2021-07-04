import s from './Table.module.scss';

function Table(props) {
  const {
    headers, content, actionBtnNew, actionBtnEdit,
  } = props;
  return (
    <div className={s.table__wrapper}>
      <table className={s.table__root}>
        <thead className={s.table__head}>
          <tr className={s.table__head_row}>
            <th className={s.table__head_cell} style={{ width: '80px' }}>
              <button type="button" className={`${s.btnLink} ${s.btnLink__new}`} onClick={actionBtnNew} aria-label="Create new" />
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
                <button type="button" className={`${s.btnLink} ${s.btnLink__edit}`} onClick={() => actionBtnEdit(c.id)} aria-label="Edit" />
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
