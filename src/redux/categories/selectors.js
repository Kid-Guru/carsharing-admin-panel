const categoryOptionsFilterSelector = (state) => {
  const { data } = state.categories;
  const options = data.map((c) => ({ label: c.name, value: c.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const categoryOptionsSelector = (state) => {
  const { data } = state.categories;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const categoryByIdSelector = (state, id) => state.categories.data.find((c) => c.id === id);

// const isFetchingSelector = (state) => state.cars.status === 'fetching';

export {
  categoryOptionsFilterSelector,
  categoryOptionsSelector,
  categoryByIdSelector,
  // isFetchingSelector,
};
