import beautify from '../../helpers/beautify';
import { categoryOptionsFilterSelector } from '../categories/selectors';
import { getImageURL } from '../../helpers/imageHelpers';

const carsListSelector = (state) => (imageComponent) => state.cars.data.map((c) => ({
  id: c.id,
  row: [
    c.name,
    imageComponent(getImageURL(c.thumbnail.path)),
    beautify.currency(c.priceMin),
    beautify.currency(c.priceMax),
    beautify.carNumber(c.number),
    c.description,
    c.categoryId?.name || '',
  ],
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

const optionsFiltersSelector = (state) => {
  const categoryOptions = categoryOptionsFilterSelector(state);
  return { categoryOptions };
};

const totalCarsSelector = (state) => {
  const { total, limit } = state.cars;
  return Math.ceil(total / limit);
};

const pageSelector = (state) => state.cars.page;

const isInitialSelector = (state) => state.cars.status === 'initial';

export {
  carsListSelector,
  carByIdSelector,
  carsOptionsFilterSelector,
  carsOptionsSelector,
  colorOptionsSelectorCarry,
  optionsFiltersSelector,
  totalCarsSelector,
  pageSelector,
  isInitialSelector,
};
