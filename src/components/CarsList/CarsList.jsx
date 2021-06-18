import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { cleanupCars, initialAllCarsRequest, setFilterCars } from '../../redux/cars/actions';
import { carsTableSelector, isInitialSelector, optionsFiltersSelector } from '../../redux/cars/selectors';
import Button from '../common/Buttons/Button';
import ButtonSubmit from '../common/Buttons/ButtonSubmit';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import SelectFilter from '../common/SelectFilterField/SelectFilterField';
import useSidePortal from '../common/SidePortal/useSidePortal';
import s from './CarsList.module.scss';
import CarsListTable from './CarsListTable/CarsListTable';

const Filters = ({ categoryOptions }) => (
  <Form className={s.filters} action="submit">
    <div className={s.filters__col}>
      <Field name="category" component={SelectFilter} options={categoryOptions} placeholder="Категория" />
    </div>
    <div className={s.filters__col}>
      <ButtonSubmit text="Применить" />
    </div>
  </Form>
);

const FiltersWithPortal = () => {
  const { categoryOptions } = useSelector(optionsFiltersSelector);
  const [isSidePortalOpen, toggleSidePortal, Portal] = useSidePortal();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const onSubmitHandle = (data) => {
    dispatch(setFilterCars(data));
    toggleSidePortal(false);
  };
  return (
    <Formik
      initialValues={{ category: null }}
      onSubmit={onSubmitHandle}
    >
      {() => {
        if (width < 1023.98) {
          return (
            <>
              <Portal>
                <div className={s.sidePortal}>
                  <Filters categoryOptions={categoryOptions} />
                </div>
              </Portal>
              <div className={s.showFiltersBtn}>
                <Button text="Фильтры" onClick={() => toggleSidePortal(true)} />
              </div>
            </>
          );
        }
        // console.log(isSidePortalOpen);
        // useEffect(() => {
        // if (isSidePortalOpen) toggleSidePortal(false);
        // }, []);
        return <Filters categoryOptions={categoryOptions} />;
      }}
    </Formik>
  );
};

function CarsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllCarsRequest());
    return () => dispatch(cleanupCars());
  }, [dispatch]);
  const carsList = useSelector(carsTableSelector);
  const isFetching = useSelector(isInitialSelector);

  if (isFetching) return <Loader />;

  return (
    <ListContentLayout
      header={<FiltersWithPortal />}
      content={<CarsListTable carsList={carsList} />}
      noIndentContent
    />
  );
}

export default CarsList;
