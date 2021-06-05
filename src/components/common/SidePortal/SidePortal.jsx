/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import reactDom from 'react-dom';
import s from './SidePortal.module.scss';

function SidePortal(props) {
  const { isOpen, children, closePortalCallback } = props;

  if (!isOpen) return null;
  return reactDom.createPortal(
    <div>
      <div className={s.portal__overlay} onClick={closePortalCallback} />
      <div className={s.portal__content}>
        {children}
      </div>
    </div>,
    document.getElementById('portal'),
  );
}

export default SidePortal;
