import s from './CitiesListTable.module.scss';

function CitiesListTable(props) {
  const { citiesList, editCityHandle, newCityHandle } = props;
  return (
    <div className={s.citiesTable__wrapper}>
      <table className={s.citiesTable__root}>
        <thead className={s.citiesTable__head}>
          <tr className={s.citiesTable__head_row}>
            <th className={s.citiesTable__head_cell}>
              <button className={`${s.btn} ${s.btn__new}`} onClick={newCityHandle} type="button" aria-label="Create new city" />
            </th>
            <th className={s.citiesTable__head_cell}>Город</th>
          </tr>
        </thead>
        <tbody className={s.citiesTable__body}>
          {citiesList.map((c) => (
            <tr key={c.id} className={s.citiesTable__body_row}>
              <td className={s.citiesTable__body_cell}>
                <button className={`${s.btn} ${s.btn__edit}`} onClick={editCityHandle({ cityName: c.name, id: c.id })} type="button" aria-label="Edit city" />
              </td>
              <td className={s.citiesTable__body_cell}>{c.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CitiesListTable;
