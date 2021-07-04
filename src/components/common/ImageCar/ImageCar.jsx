import s from 'react';

function ImageCar({ imagePath }) {
  return (
    <img className={s.image} src={imagePath} alt="Car preview" />
  );
}

export default ImageCar;
