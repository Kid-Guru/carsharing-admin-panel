import beautify from '../../helpers/beautify';
import { getImageURL } from '../../helpers/imageHelpers';

const carsTableSelector = (state) => state.cars.data.map((c) => ({
  id: c.id,
  model: c.name,
  pic: getImageURL(c.thumbnail.path),
  minPrice: beautify.currency(c.priceMin),
  maxPrice: beautify.currency(c.priceMax),
  number: beautify.carNumber(c.number),
  description: c.description,
  category: c.categoryId?.name || '',
}));

const carByIdSelector = (state, id) => state.cars.data.find((c) => c.id === id);

const carsOptionsFilterSelector = (state) => {
  const { data } = state.cars;
  const options = data.map((c) => ({ label: c.name, value: c.id }));
  return [{ label: 'Все', value: null }, ...options];
};

const carsOptionsSelector = (state) => {
  const { data } = state.cars;
  return data.map((c) => ({ label: c.name, value: c.id }));
};

const colorOptionsSelectorCarry = (state) => (carId) => {
  const findedCar = carByIdSelector(state, carId);
  return findedCar ? findedCar.colors.map((c) => c.toLowerCase()) : [];
};

const isFetchingSelector = (state) => state.cars.status === 'fetching';

export {
  carsTableSelector,
  carByIdSelector,
  carsOptionsFilterSelector,
  carsOptionsSelector,
  colorOptionsSelectorCarry,
  isFetchingSelector,
};
