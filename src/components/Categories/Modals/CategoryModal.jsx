import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import Modal from '../../common/Modal/Modal';
import InputField from '../../Form/InputField/InputField';
import TextareaField from '../../Form/TextareaField/TextareaField';
import s from './CategoryModal.module.scss';

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Поле обязательно')
    .max(100, 'Максимум 100 символов'),
  description: yup.string('Введите описание').max(200, 'Максимум 200 символов'),
});

function EditCategoryModal(props) {
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
            <TextareaField label="Описание" placeholder="Введите описание" name="description" />
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

export default EditCategoryModal;
