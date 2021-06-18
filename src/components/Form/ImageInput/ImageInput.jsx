import { useRef } from 'react';
import s from './ImageInput.module.scss';

function ImageInput(props) {
  const {
    label = 'label',
    placeholder,
    name,
    isError,
    errorText = '',
  } = props;
  const reader = new FileReader();
  reader.onload = () => {
    console.log(reader.result);
  };
  const inputRef = useRef(null);
  const addHandler = () => inputRef.current?.click();
  const onLoadHandler = (e) => {
    console.log(e.target.files)
    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <div className={s.root}>

      <span className={s.wrapper} htmlFor={label}>
        <input onChange={onLoadHandler} className={s.input} ref={inputRef} id={label} type="file" accept="image/jpeg,image/png" />
        <span className={s.text}>Выберете файл...</span>
        <button onClick={addHandler} className={s.button} type="button">Обзор</button>
      </span>

    </div>
  );
}
export default ImageInput;
