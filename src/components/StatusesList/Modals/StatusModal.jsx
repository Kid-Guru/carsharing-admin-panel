import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import Modal from '../../common/Modal/Modal';
import InputField from '../../Form/InputField/InputField';
import s from './StatusModal.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Поле обязательно')
    .max(50, 'Максимум 50 символов'),
});

function EditStatusModal(props) {
  const {
    initialValues, isModalOpen, closeCallback, onSubmitHandle, title, handleDelete,
  } = props;
  return (
    <Modal isOpen={isModalOpen} closeCallback={closeCallback} title={title}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandle}
      >
        {({ values }) => (
          <Form>
            <InputField label="Название" placeholder="Введите название" type="text" name="name" />
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

export default EditStatusModal;
