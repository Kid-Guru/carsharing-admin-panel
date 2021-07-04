const categoryOptionsFilterSelector = (state) => {
  const { data } = state.categories;
  const options = data.map((c) => ({ label: c.name, value: c.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const categoriesTableSelector = (state) => state.categories.data.map((c) => ({
  id: c.id,
  row: [c.name, c.description],
}));

const categoriesEditDataSelectorCarry = (state) => (id) => {
  const selectedcategory = state.categories.data.find((c) => c.id === id);
  return { name: selectedcategory.name, description: selectedcategory.description };
};

const categoryOptionsSelector = (state) => {
  const { data } = state.categories;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const categoryByIdSelector = (state, id) => state.categories.data.find((c) => c.id === id);

const isInitialSelector = (state) => state.categories.status === 'initial';

export {
  categoryOptionsFilterSelector,
  categoriesEditDataSelectorCarry,
  categoriesTableSelector,
  categoryOptionsSelector,
  categoryByIdSelector,
  isInitialSelector,
};
