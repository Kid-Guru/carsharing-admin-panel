const localeMap = {
  new: 'Новый',
  confirmed: 'Подтвержденный',
  cancelled: 'Отмененный',
  temp: 'Временный',
};
const getLocaleName = (name) => (name in localeMap ? localeMap[name] : name);

const statusByIdSelector = (state, id) => state.statuses.data.find((s) => s.id === id);

const statusesTableSelector = (state) => state.statuses.data.map((s) => ({
  id: s.id,
  name: s.name,
}));

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

const isInitialSelector = (state) => state.statuses.status === 'isInitialSelector';

export {
  statusByIdSelector,
  statusesTableSelector,
  statusesOptionsFilterSelector,
  statusOptionsSelector,
  isInitialSelector,
};
