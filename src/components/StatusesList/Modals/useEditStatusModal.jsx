import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { statusDelete, statusUpdate } from '../../../redux/statuses/actions';
import StatusModal from './StatusModal';

const useEditStatusModal = () => {
  const dispatch = useDispatch();
  const [editStatus, setEditStatus] = useState({
    isOpen: false, name: '', id: '',
  });
  const editStatusHandle = ({ name, id }) => () => {
    setEditStatus({
      isOpen: true, name, id,
    });
  };
  const closeCallback = () => setEditStatus({
    isOpen: false, name: '', id: '',
  });

  const StatusModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(statusUpdate(data, closeCallback));
      const handleDelete = (id) => dispatch(statusDelete(id, closeCallback));
      return (
        <StatusModal
          isModalOpen={editStatus.isOpen}
          initialValues={{
            name: editStatus.name,
            id: editStatus.id,
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          handleDelete={handleDelete}
          title="Редактировать статус"
        />
      );
    },
    [dispatch, editStatus.id, editStatus.isOpen, editStatus.name],
  );

  return [editStatusHandle, StatusModalMemo];
};

export default useEditStatusModal;
