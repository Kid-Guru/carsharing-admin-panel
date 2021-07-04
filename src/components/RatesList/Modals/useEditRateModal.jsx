import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rateDelete, rateUpdate } from '../../../redux/rates/actions';
import { rateEditDataSelectorCarry } from '../../../redux/rates/selectors';
import RateModal from './RateModal';

const useEditRateModal = () => {
  const dispatch = useDispatch();
  const rateEditData = useSelector(rateEditDataSelectorCarry);
  const [editRate, setEditRate] = useState({
    isOpen: false, price: '', rateType: null, id: '',
  });
  const editRateHandle = (id) => {
    setEditRate({ isOpen: true, id, ...rateEditData(id) });
  };
  const closeCallback = () => setEditRate({
    isOpen: false, price: '', rateType: null, id: '',
  });

  const RateModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(rateUpdate(data, closeCallback));
      const handleDelete = (id) => dispatch(rateDelete(id, closeCallback));
      return (
        <RateModal
          isModalOpen={editRate.isOpen}
          initialValues={{
            price: editRate.price,
            rateType: editRate.rateType,
            id: editRate.id,
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          handleDelete={handleDelete}
          title="Редактировать тариф"
        />
      );
    },
    [editRate.isOpen, editRate.price, editRate.rateType, editRate.id, dispatch],
  );

  return [editRateHandle, RateModalMemo];
};

export default useEditRateModal;
