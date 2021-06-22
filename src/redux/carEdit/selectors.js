import { categoryOptionsSelector } from '../categories/selectors';

const initValuesSelector = (state) => {
  const { data } = state.car;

  return {
    model: data?.name || '',
    number: data?.number || '',
    minPrice: data?.priceMin || '',
    maxPrice: data?.priceMax || '',
    fuelLevel: data?.tank || '',
    category: data?.categoryId?.id || null,
    description: data?.description || '',
    availableColors: data?.colors || [],
    thumbnail: data?.thumbnail || {},
  };
};

const fieldsOptionsSelector = (state) => {
  const categoryOptions = categoryOptionsSelector(state);
  return { categoryOptions };
};

const isFetchingSelector = (state) => state.car.status === 'fetching';
const isTrasferSeccuessSelector = (state) => state.car.status === 'transferSeccuess';

export {
  fieldsOptionsSelector,
  initValuesSelector,
  isFetchingSelector,
  isTrasferSeccuessSelector,
};
