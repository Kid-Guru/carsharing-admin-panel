/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useField } from 'formik';
import { useRef, useState } from 'react';
import * as yup from 'yup';
import s from './AvailableColors.module.scss';

const schema = yup
  .string()
  .min(3, 'Минимум 3 символа')
  .max(30, 'Максимум 30 символов')
  .when('$colors', (existingColors, schemaInstance) => schemaInstance.notOneOf(existingColors, 'Такой цвет уже есть'));

function AvailableColors(props) {
  const {
    label = 'label',
    placeholder,
    name,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField({ name });
  const inputRef = useRef(null);
  const [e, setErrorField] = useState({ isError: false, errorText: '' });

  const handleAddColor = () => {
    setErrorField({ isError: false, errorText: '' });
    let inputColor = inputRef.current.value;
    inputColor = inputColor.toLowerCase().trim();

    schema.validate(inputColor, { context: { colors: field.value } })
      .then(() => {
        helpers.setValue([...field.value, inputColor]);
        inputRef.current.value = '';
      })
      .catch((err) => {
        setErrorField({ isError: true, errorText: err.message });
      });
  };
  const handleDeleteColor = (err) => {
    const btnTarget = err.target.closest('[data-colorvalue]');
    if (btnTarget) {
      const newColors = field.value.filter((color) => color !== btnTarget.dataset.colorvalue);
      helpers.setValue([...newColors]);
    }
  };
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <label className={s.label} htmlFor={label}>
          <span className={s.title}>{label}</span>
          <div className={s.inputWrapper}>
            <input
              className={`${s.input} ${e.isError && s.input_error}`}
              name={name}
              id={label}
              placeholder={placeholder}
              ref={inputRef}
              type="text"
              autoCorrect="off"
              autoComplete="off"
            />
            <button type="button" onClick={handleAddColor} className={s.addColor}>
              <span className={s.addColor__line} />
              <span className={s.addColor__line} />
            </button>
          </div>
        </label>
        <span className={`${s.errorMessage} ${e.isError && s.errorMessage_active}`}>{e.errorText}</span>
      </div>

      <div className={s.options} onClick={handleDeleteColor}>
        {field.value.map((opt) => (
          <button key={opt} type="button" data-colorvalue={opt} className={s.options__item}>
            <span className={s.options__icon} role="presentation" />
            <span className={s.options__text}>{opt}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default AvailableColors;
