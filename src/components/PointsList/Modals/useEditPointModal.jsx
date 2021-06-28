import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pointDelete, pointUpdate } from '../../../redux/points/actions';
import PointModal from './PointModal';

const useEditPointModal = () => {
  const dispatch = useDispatch();
  const [editPoint, setEditPoint] = useState({
    isOpen: false,
    pointName: '',
    pointAddress: '',
    city: '',
    id: '',
  });
  const editPointHandle = ({
    pointName, pointAddress, city, id,
  }) => () => {
    setEditPoint({
      isOpen: true,
      pointName,
      pointAddress,
      city,
      id,
    });
  };
  const closeCallback = () => setEditPoint({
    isOpen: false,
    pointName: '',
    pointAddress: '',
    city: '',
    id: '',
  });

  const PointModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(pointUpdate(data, closeCallback));
      const handleDelete = (id) => dispatch(pointDelete(id, closeCallback));
      return (
        <PointModal
          isModalOpen={editPoint.isOpen}
          initialValues={{
            pointName: editPoint.pointName,
            pointAddress: editPoint.pointAddress,
            id: editPoint.id,
            city: editPoint.city,
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          handleDelete={handleDelete}
          title="Редактировать точку выдачи"
        />
      );
    },
    [editPoint.isOpen,
      editPoint.pointName,
      editPoint.pointAddress,
      editPoint.id,
      editPoint.city,
      dispatch],
  );

  return [editPointHandle, PointModalMemo];
};

export default useEditPointModal;
