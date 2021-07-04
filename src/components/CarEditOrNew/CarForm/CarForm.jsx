import { Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { getImageURL } from '../../../helpers/imageHelpers';
import appRoutes from '../../../routes/appRoutes';
import Button from '../../common/Buttons/Button';
import ButtonSubmit from '../../common/Buttons/ButtonSubmit';
import ImageCar from '../../common/ImageCar/ImageCar';
import AvailableColors from '../../Form/AvailableColors/AvailableColors';
import ImageInput from '../../Form/ImageInput/ImageInput';
import InputField from '../../Form/InputField/InputField';
import SelectField from '../../Form/SelectField/SelectField';
import TextareaField from '../../Form/TextareaField/TextareaField';
import s from './CarForm.module.scss';
import { validationSchema } from './validationSchema';

const countFillPercentage = (fields) => {
  const entries = Object.entries(fields);
  const fillCount = entries.reduce((acc, [key, val]) => {
    if (key === 'thumbnail') {
      return val?.size ? acc + 1 : acc;
    }
    if (key === 'availableColors') {
      return val?.length !== 0 ? acc + 1 : acc;
    }
    return val ? acc + 1 : acc;
  }, 0);
  return Math.round((100 * fillCount) / entries.length);
};

function CarForm({
  initValues, categoryOptions, submitHandle, deleteHandle,
}) {
  const history = useHistory();
  const handleBack = () => history.push(appRoutes.dashboardCars());
  return (
    <div className={s.carEdit}>
      <h2 className={s.carEdit__title}>Карточка автомобиля</h2>

      <Formik
        initialValues={{
          model: initValues.model,
          number: initValues.number,
          minPrice: initValues.minPrice,
          maxPrice: initValues.maxPrice,
          fuelLevel: initValues.fuelLevel,
          category: initValues.category,
          description: initValues.description,
          availableColors: initValues.availableColors,
          thumbnail: initValues.thumbnail,
        }}
        validationSchema={validationSchema}
        onSubmit={submitHandle}
      >
        {({ values }) => {
          const fillPercentage = countFillPercentage(values);
          const {
            description, model, category, thumbnail: { path },
          } = values;
          const imagePath = getImageURL(path);
          return (
            <Form className={s.carEdit__form}>

              <section className={`${s.carEdit__preview} ${s.preview}`}>
                <div className={s.preview__col}>
                  <div className={s.preview__section}>
                    <ImageCar imagePath={imagePath} />
                    <p className={s.preview__carName}>{model}</p>
                    <p className={s.preview__carCategory}>
                      {categoryOptions.find((c) => c.value === category)?.label}
                    </p>
                    <ImageInput label="Изображение автомобиля" placeholder="Выберете файл..." name="thumbnail" />
                  </div>
                </div>
                <div className={s.preview__col}>
                  <div className={`${s.preview__section} ${s.progress}`}>
                    <div className={s.progress__text}>
                      <span>Заполнено</span>
                      <span>{`${fillPercentage} %`}</span>
                    </div>
                    <div className={s.progress__bar}>
                      <div className={s.progress__fill} style={{ transform: `translateX(${fillPercentage - 100}%)` }} />
                    </div>
                  </div>
                  <div className={s.preview__section}>
                    <p className={s.preview__title}>Описание</p>
                    <p className={s.preview__discription}>
                      {description
                        || (
                          <span className={s.preview__discription_placeholder}>
                            Введите описание
                          </span>
                        )}
                    </p>
                  </div>
                </div>
              </section>

              <section className={`${s.carEdit__customization} ${s.customization}`}>
                <h3 className={s.customization__subtitle}>Настройки автомобиля</h3>
                <div className={s.customization__layout}>
                  <div className={s.customization__col}>
                    <InputField label="Модель автомобиля" placeholder="Введите модель" name="model" />
                    <InputField label="Номер автомобиля" placeholder="Введите номер" name="number" />
                    <InputField label="Минимальная цена" placeholder="Введите мин. цену" name="minPrice" />
                    <InputField label="Максимальная цена" placeholder="Введите макс. цену" name="maxPrice" />
                    <InputField label="Количество топлива" placeholder="Введите количество топлива" name="fuelLevel" />
                  </div>
                  <div className={s.customization__col}>
                    <SelectField label="Категория" placeholder="Выберете категорию" name="category" options={categoryOptions} />
                    <TextareaField label="Описание" placeholder="Введите описание" name="description" />
                    <AvailableColors label="Доступные цвета" placeholder="Введите цвет" name="availableColors" />
                  </div>
                </div>
                <div className={`${s.customization__btnBar} ${s.btnBar}`}>
                  <div className={s.btnBar__col}>
                    <ButtonSubmit text="Сохранить" />
                  </div>
                  <div className={s.btnBar__col}>
                    <Button onClick={handleBack} text="Назад" color="secondary" />
                  </div>
                  <div className={s.btnBar__col}>
                    {deleteHandle && <Button onClick={deleteHandle} text="Удалить" color="alert" />}
                  </div>
                </div>
              </section>

            </Form>
          );
        }}

      </Formik>
    </div>
  );
}

export default CarForm;
