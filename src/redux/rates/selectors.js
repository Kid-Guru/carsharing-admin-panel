const rateByIdSelector = (state, id) => state.rates.data.find((r) => r.id === id);

const ratesTableSelector = (state) => state.rates.data.map((c) => ({
  id: c.id,
  price: c.price,
  rateType: c.rateTypeId?.name || 'Не назначен',
  rateTypeId: c.rateTypeId?.id || null,
}));

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
  ratesTableSelector,
  rateOptionsSelector,
  isInitialSelector,
  ratesUnitsSelectorCarry,
};
