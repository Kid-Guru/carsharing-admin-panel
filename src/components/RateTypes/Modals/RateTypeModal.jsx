import { Form, Formik } from 'formik';
import * as yup from 'yup';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import Modal from '../../common/Modal/Modal';
import InputField from '../../Form/InputField/InputField';
import s from './RateTypeModal.module.scss';

const validationSchema = yup.object().shape({
  rateTypeName: yup.string().typeError('Введите название').required('Поле обязательно'),
  unit: yup.string().typeError('Введите единицу измерения').required('Поле обязательно'),
});

function EditRateTypeModal(props) {
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
            <InputField label="Тип тарифа" placeholder="Введите название тарифа" type="text" name="rateTypeName" />
            <InputField label="Единица измерения" placeholder="Введите единицу измерения" type="text" name="unit" />
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

export default EditRateTypeModal;
