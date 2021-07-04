import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { statusDelete, statusUpdate } from '../../../redux/statuses/actions';
import { statusEditDataSelectorCarry } from '../../../redux/statuses/selectors';
import StatusModal from './StatusModal';

const useEditStatusModal = () => {
  const dispatch = useDispatch();
  const statusEditData = useSelector(statusEditDataSelectorCarry);
  const [editStatus, setEditStatus] = useState({
    isOpen: false, name: '', id: '',
  });
  const editStatusHandle = (id) => {
    setEditStatus({
      isOpen: true, id, ...statusEditData(id),
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
