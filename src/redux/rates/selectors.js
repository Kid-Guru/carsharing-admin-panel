const rateByIdSelector = (state, id) => state.rates.data.find((r) => r.id === id);

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

const isFetchingSelector = (state) => state.points.status === 'fetching';

export {
  rateByIdSelector,
  rateOptionsSelector,
  isFetchingSelector,
  ratesUnitsSelectorCarry,
};
