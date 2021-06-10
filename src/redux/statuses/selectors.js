const localeMap = {
  new: 'Новый',
  confirmed: 'Подтвержденный',
  cancelled: 'Отмененный',
  temp: 'Временный',
};
const getLocaleName = (name) => (name in localeMap ? localeMap[name] : name);

const statusesOptionsFilterSelector = (state) => {
  const { data } = state.statuses;
  const options = data
    .map((s) => ({ label: getLocaleName(s.name), value: s.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const statusOptionsSelector = (state) => {
  const { data } = state.statuses;
  return data.map((s) => ({ label: getLocaleName(s.name), value: s.id }));
};

const isFetchingSelector = (state) => state.cars.status === 'fetching';

export {
  statusesOptionsFilterSelector,
  statusOptionsSelector,
  isFetchingSelector,
};
