import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { statusPost } from '../../../redux/statuses/actions';
import StatusModal from './StatusModal';

const useNewStatusModal = () => {
  const dispatch = useDispatch();
  const [editStatus, setEditStatus] = useState({ isOpen: false });
  const editStatusHandle = () => setEditStatus({ isOpen: true });
  const closeCallback = () => setEditStatus({ isOpen: false });

  const StatusModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(statusPost(data, closeCallback));
      return (
        <StatusModal
          isModalOpen={editStatus.isOpen}
          initialValues={{
            name: '',
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          title="Добавить статус"
        />
      );
    },
    [dispatch, editStatus.isOpen],
  );

  return [editStatusHandle, StatusModalMemo];
};

export default useNewStatusModal;
