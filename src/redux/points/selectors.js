const pointByIdSelector = (state, id) => state.points.data.find((p) => p.id === id);

const pointsTableSelector = (state) => state.points.data.map((c) => ({
  id: c.id,
  row: [c.name, c.cityId?.name || 'город не назначен', c.address],
}));

const pointEditDataSelectorCarry = (state) => (id) => {
  const selectedPoint = state.points.data.find((p) => p.id === id);
  return {
    pointName: selectedPoint.name,
    pointAddress: selectedPoint.address,
    city: selectedPoint.cityId?.id || null,
  };
};

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
  pointEditDataSelectorCarry,
  pointsTableSelector,
  pointOptionsSelectorCarry,
  pointOptionsSelector,
  isInitialSelector,
};
