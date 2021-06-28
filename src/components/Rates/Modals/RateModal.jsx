import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { rateTypesOptionsSelector } from '../../../redux/rateTypes/selectors';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import Modal from '../../common/Modal/Modal';
import InputField from '../../Form/InputField/InputField';
import SelectField from '../../Form/SelectField/SelectField';
import s from './RateModal.module.scss';

const validationSchema = yup.object().shape({
  price: yup.number()
    .typeError('Введите число')
    .required('Поле обязательно')
    .min(0, 'Не может быть отрицательной'),
  rateType: yup.string().required('Поле обязательно').nullable(),
});

function EditRateModal(props) {
  const {
    initialValues, isModalOpen, closeCallback, onSubmitHandle, title, handleDelete,
  } = props;
  const rateTypesOptions = useSelector(rateTypesOptionsSelector);
  return (
    <Modal isOpen={isModalOpen} closeCallback={closeCallback} title={title}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandle}
      >
        {({ values }) => (
          <Form>
            <InputField label="Цена" placeholder="Введите цену" type="text" name="price" />
            <SelectField label="Тип тарифа" placeholder="Выберете тип тарифа" name="rateType" options={rateTypesOptions} />
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

export default EditRateModal;
