import s from './PointsListTable.module.scss';

function PointsListTable(props) {
  const { pointsList, editPointHandle, newPointHandle } = props;
  return (
    <div className={s.pointsTable__wrapper}>
      <table className={s.pointsTable__root}>
        <thead className={s.pointsTable__head}>
          <tr className={s.pointsTable__head_row}>
            <th className={s.pointsTable__head_cell}>
              <button className={`${s.btn} ${s.btn__new}`} onClick={newPointHandle} type="button" aria-label="Create new point" />
            </th>
            <th className={s.pointsTable__head_cell}>Точка выдачи</th>
            <th className={s.pointsTable__head_cell}>Город</th>
            <th className={s.pointsTable__head_cell}>Адрес</th>
          </tr>
        </thead>
        <tbody className={s.pointsTable__body}>
          {pointsList.map((c) => (
            <tr key={c.id} className={s.pointsTable__body_row}>
              <td className={s.pointsTable__body_cell}>
                <button className={`${s.btn} ${s.btn__edit}`} onClick={editPointHandle({ pointName: c.name, pointAddress: c.address, city: c.cityId, id: c.id })} type="button" aria-label="Edit point" />
              </td>
              <td className={s.pointsTable__body_cell}>{c.name}</td>
              <td className={s.pointsTable__body_cell}>{c.cityName}</td>
              <td className={s.pointsTable__body_cell}>{c.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PointsListTable;
