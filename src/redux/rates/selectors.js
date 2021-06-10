const rateByIdSelector = (state, id) => state.rates.data.find((r) => r.id === id);

const rateOptionsSelector = (state) => {
  const { data } = state.rates;
  return data.map((r) => ({ label: r.rateTypeId.name, value: r.id }));
};

const isFetchingSelector = (state) => state.points.status === 'fetching';

export {
  rateByIdSelector,
  rateOptionsSelector,
  isFetchingSelector,
};
