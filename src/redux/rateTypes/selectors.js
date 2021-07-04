const rateTypesTableSelector = (state) => state.rateTypes.data.map((c) => ({
  id: c.id,
  row: [c.name, c.unit],
}));

const rateTypeEditDataSelectorCarry = (state) => (id) => {
  const selectedRateType = state.rateTypes.data.find((r) => r.id === id);
  return { rateTypeName: selectedRateType.name, unit: selectedRateType.unit };
};

const rateTypesOptionsSelector = (state) => {
  const { data } = state.rateTypes;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const isInitialSelector = (state) => state.rateTypes.status === 'initial';

export {
  rateTypesTableSelector,
  rateTypeEditDataSelectorCarry,
  rateTypesOptionsSelector,
  isInitialSelector,
};
