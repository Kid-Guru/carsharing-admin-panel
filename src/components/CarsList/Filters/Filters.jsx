import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { setFilterCars } from '../../../redux/cars/actions';
import { optionsFiltersSelector } from '../../../redux/cars/selectors';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import SelectFilter from '../../common/SelectFilterField/SelectFilterField';
import useSidePortal from '../../common/SidePortal/useSidePortal';
import s from './Filters.module.scss';

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
  if (isSidePortalOpen && width >= 1023.98) {
    toggleSidePortal(false);
  }
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
        return <Filters categoryOptions={categoryOptions} />;
      }}
    </Formik>
  );
};

export default FiltersWithPortal;
