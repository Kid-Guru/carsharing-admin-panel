import s from './CarsListTable.module.scss';

function CarsListTable(props) {
  const { carsList } = props;
  return (
    <div className={s.carTable__wrapper}>
      <table className={s.carTable__root}>
        <thead className={s.carTable__head}>
          <tr className={s.carTable__head_row}>
            <th className={s.carTable__head_cell}>Модель</th>
            <th className={s.carTable__head_cell}>Изображение</th>
            <th className={s.carTable__head_cell}>Мин. цена</th>
            <th className={s.carTable__head_cell}>Макс. цена</th>
            <th className={s.carTable__head_cell}>Номер</th>
            <th className={s.carTable__head_cell}>Описание</th>
            <th className={s.carTable__head_cell}>Категория</th>
          </tr>
        </thead>
        <tbody className={s.carTable__body}>
          {carsList.map((c) => (
            <tr key={c.id} className={s.carTable__body_row}>
              <td className={s.carTable__body_cell}>{c.model}</td>
              <td className={s.carTable__body_cell}>
                <div className={s.carTable__pic} style={{ backgroundImage: `url(${c.pic})` }} />
              </td>
              <td className={s.carTable__body_cell}>{c.minPrice}</td>
              <td className={s.carTable__body_cell}>{c.maxPrice}</td>
              <td className={s.carTable__body_cell}>{c.number}</td>
              <td className={s.carTable__body_cell}>{c.description}</td>
              <td className={s.carTable__body_cell}>{c.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarsListTable;
