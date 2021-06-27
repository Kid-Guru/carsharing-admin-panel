import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateTypeDelete, rateTypeUpdate } from '../../../redux/rateTypes/actions';
import RateTypeModal from './RateTypeModal';

const useEditRateTypeModal = () => {
  const dispatch = useDispatch();
  const [editRateType, setEditRateType] = useState({
    isOpen: false, rateTypeName: '', unit: '', id: '',
  });
  const editRateTypeHandle = ({ rateTypeName, unit, id }) => () => {
    setEditRateType({
      isOpen: true, rateTypeName, unit, id,
    });
  };
  const closeCallback = () => setEditRateType({
    isOpen: false, rateTypeName: '', unit: '', id: '',
  });

  const RateTypeModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(rateTypeUpdate(data, closeCallback));
      const handleDelete = (id) => dispatch(rateTypeDelete(id, closeCallback));
      return (
        <RateTypeModal
          isModalOpen={editRateType.isOpen}
          initialValues={{
            rateTypeName: editRateType.rateTypeName,
            unit: editRateType.unit,
            id: editRateType.id,
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          handleDelete={handleDelete}
          title="Редактировать тип тарифа"
        />
      );
    },
    [editRateType.isOpen, editRateType.rateTypeName, editRateType.unit, editRateType.id, dispatch],
  );

  return [editRateTypeHandle, RateTypeModalMemo];
};

export default useEditRateTypeModal;
