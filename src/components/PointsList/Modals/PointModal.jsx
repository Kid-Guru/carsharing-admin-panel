import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { cityOptionsSelector } from '../../../redux/cities/selectors';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import Modal from '../../common/Modal/Modal';
import InputField from '../../Form/InputField/InputField';
import SelectField from '../../Form/SelectField/SelectField';
import s from './PointModal.module.scss';

const validationSchema = yup.object().shape({
  pointName: yup.string().typeError('Введите название').required('Поле обязательно'),
  pointAddress: yup.string().typeError('Введите адрес').required('Поле обязательно'),
  city: yup.string().typeError('Выберете город').required('Поле обязательно'),
});

function EditPointModal(props) {
  const {
    initialValues, isModalOpen, closeCallback, onSubmitHandle, title, handleDelete,
  } = props;
  const cityOptions = useSelector(cityOptionsSelector);
  return (
    <Modal isOpen={isModalOpen} closeCallback={closeCallback} title={title}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandle}
      >
        {({ values }) => (
          <Form>
            <InputField label="Название" placeholder="Введите название точки" type="text" name="pointName" />
            <InputField label="Адрес" placeholder="Введите адрес точки" type="text" name="pointAddress" />
            <SelectField label="Город" placeholder="Выберете город" name="city" options={cityOptions} />
            <div className={s.btn__bar}>
              <ButtonSubmit text="Сохранить" />
              {handleDelete && <Button onClick={() => handleDelete(values.id)} text="Удалить" color="alert" />}
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}

export default EditPointModal;
