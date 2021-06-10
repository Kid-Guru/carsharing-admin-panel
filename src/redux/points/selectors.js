const pointByIdSelector = (state, id) => state.points.data.find((p) => p.id === id);

const pointOptionsSelector = (state) => {
  const { data } = state.points;
  const { id: selectedCity } = state.order.data?.cityId;
  return data
    .filter((p) => p.cityId.id === selectedCity)
    .map((p) => ({ label: p.name, value: p.id }));
};

const isFetchingSelector = (state) => state.points.status === 'fetching';

export {
  pointByIdSelector,
  pointOptionsSelector,
  isFetchingSelector,
};
