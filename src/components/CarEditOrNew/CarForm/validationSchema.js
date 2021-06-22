import * as yup from 'yup';

// Сделать валидацию картинки
export const validationSchema = yup.object().shape({
  model: yup.string()
    .required('Поле обязательно')
    .max(100, 'Максимум 100 символов'),
  minPrice: yup.number()
    .typeError('Введите число')
    .required('Поле обязательно')
    .min(0, 'Не может быть отрицательной')
    .when('maxPrice', (maxPrice, schema) => (maxPrice !== undefined
      ? schema.max(maxPrice, `Не может быть больше ${maxPrice}`) : schema)),
  maxPrice: yup.number()
    .typeError('Введите число')
    .required('Поле обязательно')
    .min(0, 'Не может быть отрицательной')
    .when('minPrice', (minPrice, schema) => (minPrice !== undefined
      ? schema.min(minPrice, `Не может быть меньше ${minPrice}`) : schema)),
  fuelLevel: yup.number()
    .typeError('Введите число')
    .required('Поле обязательно')
    .min(0, 'Минимум 0%')
    .max(100, 'Максимум 100%'),
  category: yup.string().required('Поле обязательно').nullable(true),
  description: yup.string('Введите описание').max(200, 'Максимум 200 символов'),
  thumbnail: yup.object().shape({
    size: yup.number()
      .required('Загрузите изображение')
      .min(0, 'Загрузите изображение'),
  }),
}, [['minPrice', 'maxPrice']]);
