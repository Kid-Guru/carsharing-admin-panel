const pointByIdSelector = (state, id) => state.points.data.find((p) => p.id === id);

const pointsTableSelector = (state) => state.points.data.map((c) => ({
  id: c.id,
  name: c.name,
  address: c.address,
  cityName: c.cityId?.name || 'город не назначен',
  cityId: c.cityId?.id || null,
}));

const pointOptionsSelector = (state) => {
  const { data } = state.points;
  const { id: selectedCity } = state.order.data?.cityId;
  return data
    .filter((p) => p.cityId?.id === selectedCity)
    .map((p) => ({ label: p.name, value: p.id }));
};

const pointOptionsSelectorCarry = (state) => (cityId) => {
  const { data } = state.points;
  return data
    .filter((p) => p.cityId?.id === cityId)
    .map((p) => ({ label: p.name, value: p.id }));
};

const isInitialSelector = (state) => state.points.status === 'initial';

export {
  pointByIdSelector,
  pointsTableSelector,
  pointOptionsSelectorCarry,
  pointOptionsSelector,
  isInitialSelector,
};
