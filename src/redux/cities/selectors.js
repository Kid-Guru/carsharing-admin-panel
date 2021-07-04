const cityByIdSelector = (state, id) => state.cities.data.find((c) => c.id === id);

const citiesTableSelector = (state) => state.cities.data.map((c) => ({
  id: c.id,
  row: [c.name],
}));

const cityEditDataSelectorCarry = (state) => (id) => {
  const selectedCity = state.cities.data.find((c) => c.id === id);
  return { cityName: selectedCity.name };
};

const cityOptionsFilterSelector = (state) => {
  const { data } = state.cities;
  const options = data.map((c) => ({ label: c.name, value: c.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const cityOptionsSelector = (state) => {
  const { data } = state.cities;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const isInitialSelector = (state) => state.cities.status === 'initial';

export {
  cityByIdSelector,
  citiesTableSelector,
  cityEditDataSelectorCarry,
  cityOptionsFilterSelector,
  cityOptionsSelector,
  isInitialSelector,
};
