import s from './StatusesListTable.module.scss';

function StatusesListTable(props) {
  const { statusesList, editStatusHandle, newStatusHandle } = props;
  return (
    <div className={s.statusesTable__wrapper}>
      <table className={s.statusesTable__root}>
        <thead className={s.statusesTable__head}>
          <tr className={s.statusesTable__head_row}>
            <th className={s.statusesTable__head_cell}>
              <button className={`${s.btn} ${s.btn__new}`} onClick={newStatusHandle} type="button" aria-label="Create new rate" />
            </th>
            <th className={s.statusesTable__head_cell}>Название</th>
          </tr>
        </thead>
        <tbody className={s.statusesTable__body}>
          {statusesList.map((c) => (
            <tr key={c.id} className={s.statusesTable__body_row}>
              <td className={s.statusesTable__body_cell}>
                <button className={`${s.btn} ${s.btn__edit}`} onClick={editStatusHandle({ name: c.name, id: c.id })} type="button" aria-label="Edit rate" />
              </td>
              <td className={s.statusesTable__body_cell}>{c.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StatusesListTable;
