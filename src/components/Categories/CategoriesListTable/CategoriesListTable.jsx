import s from './CategoriesListTable.module.scss';

function CategoriesListTable(props) {
  const { categoriesList, editCategoryHandle, newCategoryHandle } = props;
  return (
    <div className={s.categoriesTable__wrapper}>
      <table className={s.categoriesTable__root}>
        <thead className={s.categoriesTable__head}>
          <tr className={s.categoriesTable__head_row}>
            <th className={s.categoriesTable__head_cell}>
              <button className={`${s.btn} ${s.btn__new}`} onClick={newCategoryHandle} type="button" aria-label="Create new rate" />
            </th>
            <th className={s.categoriesTable__head_cell}>Название</th>
            <th className={s.categoriesTable__head_cell}>Описание</th>
          </tr>
        </thead>
        <tbody className={s.categoriesTable__body}>
          {categoriesList.map((c) => (
            <tr key={c.id} className={s.categoriesTable__body_row}>
              <td className={s.categoriesTable__body_cell}>
                <button className={`${s.btn} ${s.btn__edit}`} onClick={editCategoryHandle({ name: c.name, description: c.description, id: c.id })} type="button" aria-label="Edit rate" />
              </td>
              <td className={s.categoriesTable__body_cell}>{c.name}</td>
              <td className={s.categoriesTable__body_cell}>{c.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriesListTable;
