const carsDataSelector = (state) => state.cars.data;

const carByIdSelector = (state, id) => state.cars.data.find((c) => c.id === id);

const carsOptionsFilterSelector = (state) => {
  const { data } = state.cars;
  const options = data.map((c) => ({ label: c.name, value: c.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const carsOptionsSelector = (state) => {
  const { data } = state.cars;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const isFetchingSelector = (state) => state.cars.status === 'fetching';

export {
  carsDataSelector,
  carByIdSelector,
  carsOptionsFilterSelector,
  carsOptionsSelector,
  isFetchingSelector,
};
