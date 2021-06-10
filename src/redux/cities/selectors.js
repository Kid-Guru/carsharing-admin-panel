const cityOptionsFilterSelector = (state) => {
  const { data } = state.cities;
  const options = data.map((c) => ({ label: c.name, value: c.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const cityOptionsSelector = (state) => {
  const { data } = state.cities;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const isFetchingSelector = (state) => state.cities.status === 'fetching';

export {
  cityOptionsFilterSelector,
  cityOptionsSelector,
  isFetchingSelector,
};
