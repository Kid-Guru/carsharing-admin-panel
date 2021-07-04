const rateByIdSelector = (state, id) => state.rates.data.find((r) => r.id === id);

const ratesTableSelector = (state) => state.rates.data.map((c) => ({
  id: c.id,
  row: [c.rateTypeId?.name || 'Не назначен', c.price],
}));

const rateEditDataSelectorCarry = (state) => (id) => {
  const selectedRate = state.rates.data.find((r) => r.id === id);
  return {
    price: selectedRate.price,
    rateType: selectedRate.rateTypeId?.id || null,
  };
};

const rateOptionsSelector = (state) => {
  const { data } = state.rates;
  return data
    .filter((r) => r.rateTypeId !== null)
    .map((r) => ({ label: r.rateTypeId.name, value: r.id }));
};

const ratesUnitsSelectorCarry = (state) => (rateId) => {
  const { data } = state.rates;
  const rate = data.find((r) => r.id === rateId);
  if (!rate) return null;
  return {
    unit: rate.rateTypeId.unit,
    price: rate.price,
  };
};

const isInitialSelector = (state) => state.rates.status === 'initial';

export {
  rateByIdSelector,
  rateEditDataSelectorCarry,
  ratesTableSelector,
  rateOptionsSelector,
  isInitialSelector,
  ratesUnitsSelectorCarry,
};
