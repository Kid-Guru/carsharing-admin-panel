import { useField } from 'formik';
import { useRef } from 'react';
import s from './ImageInput.module.scss';

function ImageInput(props) {
  const {
    label = 'label',
    // placeholder,
    name,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField({ name });
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
      <input onChange={onLoadHandler} className={s.input} ref={inputRef} id={label} type="file" accept="image/jpeg,image/png" />
      <div className={s.text}>{field.value?.originalname}</div>
      <button onClick={addHandler} className={s.button} type="button">Обзор</button>
    </div>
  );
}
export default ImageInput;
