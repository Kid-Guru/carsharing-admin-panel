import { useSelector } from 'react-redux';
import { messageBarSelector } from '../../redux/messageBar/selectors';
import s from './MessageBar.module.scss';

const color = {
  success: s.success,
  alert: s.alert,
};

function MessageBar() {
  const { isShowing, text, type } = useSelector(messageBarSelector);
  return (
    <div className={`${s.root} ${isShowing ? s.root_showing : ''} ${color[type]}`}>
      {text}
    </div>
  );
}

export default MessageBar;
