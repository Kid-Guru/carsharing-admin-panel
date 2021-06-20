import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useWindowSize } from 'react-use';
import { optionsFiltersSelector } from '../../../redux/orders/selectors';
import { setFilterOrders } from '../../../redux/orders/actions';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import SelectFilter from '../../common/SelectFilterField/SelectFilterField';
import SidePortal from '../../common/SidePortal/SidePortal';
import s from './Filters.module.scss';

const Filters = () => {
  const { modelOptions, cityOptions, statusOptions } = useSelector(optionsFiltersSelector);
  return (
    <Form className={s.filters} action="submit">
      <div className={s.filters__col}>
        <Field name="model" component={SelectFilter} options={modelOptions} placeholder="Модель" />
      </div>
      <div className={s.filters__col}>
        <Field name="city" component={SelectFilter} options={cityOptions} placeholder="Город" />
      </div>
      <div className={s.filters__col}>
        <Field name="status" component={SelectFilter} options={statusOptions} placeholder="Статус" />
      </div>
      <div className={s.filters__col}>
        <ButtonSubmit text="Применить" />
      </div>
    </Form>
  );
};

const FiltersWithPortal = () => {
  const [isSideFiltersOpen, toggleSideFilters] = useState(false);
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const onSubmitHandle = (data) => {
    dispatch(setFilterOrders(data));
    toggleSideFilters(false);
  };
  return (
    <Formik
      initialValues={{
        model: null,
        city: null,
        status: null,
      }}
      onSubmit={onSubmitHandle}
    >
      {() => {
        if (width < 1023.98) {
          return (
            <>
              <SidePortal
                isOpen={isSideFiltersOpen}
                closePortalCallback={() => toggleSideFilters(false)}
              >
                <div className={s.sidePortal}>
                  <Filters onSubmitHandle={onSubmitHandle} />
                </div>
              </SidePortal>
              <div className={s.showFiltersBtn}>
                <Button text="Фильтры" onClick={() => toggleSideFilters(true)} />
              </div>
            </>
          );
        }
        return (
          <Filters onSubmitHandle={onSubmitHandle} />
        );
      }}
    </Formik>
  );
};

export default FiltersWithPortal;
