const rateTypesTableSelector = (state) => state.rateTypes.data.map((c) => ({
  id: c.id,
  name: c.name,
  unit: c.unit,
}));

const isInitialSelector = (state) => state.rateTypes.status === 'initial';

export {
  rateTypesTableSelector,
  isInitialSelector,
};
