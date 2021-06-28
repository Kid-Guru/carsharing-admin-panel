import s from './RatesListTable.module.scss';

function RatesListTable(props) {
  const { ratesList, editRateHandle, newRateHandle } = props;
  return (
    <div className={s.ratesTable__wrapper}>
      <table className={s.ratesTable__root}>
        <thead className={s.ratesTable__head}>
          <tr className={s.ratesTable__head_row}>
            <th className={s.ratesTable__head_cell}>
              <button className={`${s.btn} ${s.btn__new}`} onClick={newRateHandle} type="button" aria-label="Create new rate" />
            </th>
            <th className={s.ratesTable__head_cell}>Тип тарифа</th>
            <th className={s.ratesTable__head_cell}>Цена</th>
          </tr>
        </thead>
        <tbody className={s.ratesTable__body}>
          {ratesList.map((c) => (
            <tr key={c.id} className={s.ratesTable__body_row}>
              <td className={s.ratesTable__body_cell}>
                <button className={`${s.btn} ${s.btn__edit}`} onClick={editRateHandle({ price: c.price, rateType: c.rateTypeId, id: c.id })} type="button" aria-label="Edit rate" />
              </td>
              <td className={s.ratesTable__body_cell}>{c.rateType}</td>
              <td className={s.ratesTable__body_cell}>{c.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RatesListTable;
