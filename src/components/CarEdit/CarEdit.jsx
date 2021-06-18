import { Form, Formik } from 'formik';
import InputField from '../Form/InputField/InputField';
import SelectField from '../Form/SelectField/SelectField';
import TextareaField from '../Form/TextareaField/TextareaField';
import ButtonSubmit from '../common/Buttons/ButtonSubmit';
import Button from '../common/Buttons/Button';
import s from './CarEdit.module.scss';
import AvailableColors from '../Form/AvailableColors/AvailableColors';
import ImageInput from '../Form/ImageInput/ImageInput';

const categoryOptions = [];

function CarEdit() {
  return (
    <div className={s.carEdit}>
      <h2 className={s.carEdit__title}>Карточка автомобиля</h2>

      <Formik
        initialValues={{
          model: '',
          number: '',
          minPrice: '',
          maxPrice: '',
          fuelLevel: '',
          description: '',
          availableColors: ['цвет1', 'цвет2', 'цвет3', 'цвет4'],
        }}
      >
        <Form>

          <div className={s.carEdit__content}>

            <section className={`${s.carEdit__preview} ${s.preview}`}>
              <div className={s.preview__section}>
                <img className={s.preview__image} src="https://api-factory.simbirsoft1.com/files/5ffc671fad015e0bb6997389_%D0%91%D0%B5%D0%B7_%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F__1_.png" alt="Car preview" />
                <p className={s.preview__carName}>Hyndai, i30 N</p>
                <p className={s.preview__carCategory}>Компакт-кар</p>
                <ImageInput />
              </div>
              <div className={s.preview__section}>
                <div className={s.progress__text}>
                  <span>Заполнено</span>
                  <span>74%</span>
                </div>
                <div className={s.progress__bar}>
                  <div className={s.progress__fill} />
                </div>
              </div>
              <div className={s.preview__section}>
                <p className={s.preview__title}>Описание</p>
                <p className={s.preview__discription}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ab officia, labore in consectetur ratione sed aliquid, provident perspiciatis exercitationem, dolorem magnam atque reprehenderit maxime. Voluptatum excepturi vero explicabo ratione.</p>
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
                  <SelectField label="Категория" placeholder="Выберете категорию" name="city" options={categoryOptions} />
                  <TextareaField label="Описание" placeholder="Введите описание" name="description" />
                  <AvailableColors label="Доступные цвета" placeholder="Введите цвет" name="availableColors" />
                </div>
              </div>
              <div className={`${s.customization__btnBar} ${s.btnBar}`}>
                <div className={s.btnBar__col}>
                  <ButtonSubmit text="Сохранить" />
                </div>
                <div className={s.btnBar__col}>
                  <Button onClick={() => { }} text="Назад" color="secondary" />
                </div>
                <div className={s.btnBar__col}>
                  <Button onClick={() => { }} text="Удалить" color="alert" />
                </div>
              </div>
            </section>

          </div>

        </Form>
      </Formik>
    </div>
  );
}

export default CarEdit;
