import s from './ImageCar.module.scss';

function ImageCar({ imagePath }) {
  return (
    <img className={s.image} src={imagePath} alt="Car preview" width="1280" heigth="720" />
  );
}

export default ImageCar;
