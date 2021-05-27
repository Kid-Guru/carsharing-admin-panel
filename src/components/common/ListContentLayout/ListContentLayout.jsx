import { Field, Form, Formik } from 'formik';
import ButtonSubmit from '../Buttons/ButtonSubmit/ButtonSubmit';
import OrdersList from '../OrdersList/OrdersList';
import Paginator from '../Paginator/Paginator';
import SelectFilter from '../SelectFilterField/SelectFilterField';
// import Box from '../Box/Box';
import s from './ListContentLayout.module.scss';

const options = [{ label: 'option1', value: 'option1id' }, { label: 'option2', value: 'option2id' }];

function ListContentLayout() {
  // const { text, href, sizeSmall } = props;

  const onSubmitHandle = (e) => console.log(e);
  return (
    <article className={s.listContentLayout}>
      <h2 className={s.listContentLayout__title}>Заголовок</h2>
      <div className={s.listContentLayout__wrapper}>
        <div className={s.listContentLayout__filters}>
          <Formik
            initialValues={{
              example: '',
              example2: '',
              example3: '',
            }}
            onSubmit={onSubmitHandle}
          >
            <Form className={s.filters} action="submit">
              <div className={s.filters__leftCol}>
                <Field name="example" component={SelectFilter} options={options} placeholder="fregrt" />
                <Field name="example2" component={SelectFilter} options={options} placeholder="fregrt" />
                <Field name="example3" component={SelectFilter} options={options} placeholder="fregrt" />
              </div>
              <div className={s.filters__rightCol}>
                <ButtonSubmit text="Применить" />
              </div>
            </Form>
          </Formik>
        </div>
        <div className={s.listContentLayout__content}>
          <OrdersList />
        </div>
        <div className={s.listContentLayout__footer}>
          <Paginator />
        </div>
      </div>
    </article>
  );
}

export default ListContentLayout;
