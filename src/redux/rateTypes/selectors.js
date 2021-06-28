const rateTypesTableSelector = (state) => state.rateTypes.data.map((c) => ({
  id: c.id,
  name: c.name,
  unit: c.unit,
}));

const rateTypesOptionsSelector = (state) => {
  const { data } = state.rateTypes;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const isInitialSelector = (state) => state.rateTypes.status === 'initial';

export {
  rateTypesTableSelector,
  rateTypesOptionsSelector,
  isInitialSelector,
};
