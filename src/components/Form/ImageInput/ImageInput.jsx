import { useField } from 'formik';
import { useRef } from 'react';
import s from './ImageInput.module.scss';

function ImageInput(props) {
  const {
    label = 'label',
    placeholder = 'Загрузите изображение',
    name,
  } = props;
  const [field, meta, helpers] = useField({ name });
  const isError = meta.touched && meta.error;
  const inputRef = useRef(null);
  const addHandler = () => inputRef.current?.click();
  const onLoadHandler = (e) => {
    const thumbnail = {
      size: 0,
      originalname: '',
      mimetype: '',
      path: '',
    };
    const reader = new FileReader();
    reader.onload = () => {
      helpers.setValue({ ...thumbnail, path: reader.result });
    };
    const fileImage = e.target.files?.[0];
    if (!fileImage) return;
    thumbnail.size = fileImage.size;
    thumbnail.originalname = fileImage.name;
    thumbnail.mimetype = fileImage.type;
    reader.readAsDataURL(fileImage);
  };
  return (
    <div className={s.root}>
      <input
        onChange={onLoadHandler}
        className={s.input}
        ref={inputRef}
        id={label}
        type="file"
        accept="image/jpeg,image/png"
      />
      <div className={`${s.text} ${isError && s.text_error}`}>
        {field.value?.originalname || placeholder}
      </div>
      <button onClick={addHandler} className={`${s.button} ${isError && s.button_error}`} type="button">Обзор</button>
    </div>
  );
}
export default ImageInput;
