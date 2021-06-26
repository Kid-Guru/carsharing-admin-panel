/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import reactDom from 'react-dom';
import s from './Modal.module.scss';

function Modal(props) {
  const {
    isOpen, children, title = 'Заголовок', closeCallback,
  } = props;

  if (!isOpen) return null;
  return reactDom.createPortal(
    <>
      <div className={s.portal__overlay} onClick={closeCallback} />
      <div className={s.portal__content} onClick={(e) => e.stopPropagation()}>
        <h3 className={s.portal__title}>{title}</h3>
        {children}
      </div>
    </>,
    document.getElementById('portal'),
  );
}

export default Modal;
