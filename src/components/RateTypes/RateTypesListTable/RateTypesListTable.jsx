import s from './RateTypesListTable.module.scss';

function RateTypesListTable(props) {
  const { rateTypesList, editRateTypeHandle, newRateTypeHandle } = props;
  return (
    <div className={s.rateTypesTable__wrapper}>
      <table className={s.rateTypesTable__root}>
        <thead className={s.rateTypesTable__head}>
          <tr className={s.rateTypesTable__head_row}>
            <th className={s.rateTypesTable__head_cell}>
              <button className={`${s.btn} ${s.btn__new}`} onClick={newRateTypeHandle} type="button" aria-label="Create new rateType" />
            </th>
            <th className={s.rateTypesTable__head_cell}>Название</th>
            <th className={s.rateTypesTable__head_cell}>Ед. измерения</th>
          </tr>
        </thead>
        <tbody className={s.rateTypesTable__body}>
          {rateTypesList.map((c) => (
            <tr key={c.id} className={s.rateTypesTable__body_row}>
              <td className={s.rateTypesTable__body_cell}>
                <button className={`${s.btn} ${s.btn__edit}`} onClick={editRateTypeHandle({ rateTypeName: c.name, unit: c.unit, id: c.id })} type="button" aria-label="Edit rateType" />
              </td>
              <td className={s.rateTypesTable__body_cell}>{c.name}</td>
              <td className={s.rateTypesTable__body_cell}>{c.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RateTypesListTable;
