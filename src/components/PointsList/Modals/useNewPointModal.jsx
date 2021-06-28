import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { pointPost } from '../../../redux/points/actions';
import PointModal from './PointModal';

const useNewPointModal = () => {
  const dispatch = useDispatch();
  const [editPoint, setEditPoint] = useState({ isOpen: false });
  const editPointHandle = () => setEditPoint({ isOpen: true });
  const closeCallback = () => setEditPoint({ isOpen: false });

  const PointModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(pointPost(data, closeCallback));
      return (
        <PointModal
          isModalOpen={editPoint.isOpen}
          initialValues={{
            pointName: '', pointAddress: '', city: '', id: '',
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          title="Добавить точку выдачи"
        />
      );
    },
    [dispatch, editPoint.isOpen],
  );

  return [editPointHandle, PointModalMemo];
};

export default useNewPointModal;
