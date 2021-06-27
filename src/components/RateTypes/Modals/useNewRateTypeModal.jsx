import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { rateTypePost } from '../../../redux/rateTypes/actions';
import RateTypeModal from './RateTypeModal';

const useNewRateTypeModal = () => {
  const dispatch = useDispatch();
  const [editRateType, setEditRateType] = useState({ isOpen: false });
  const editRateTypeHandle = () => setEditRateType({ isOpen: true });
  const closeCallback = () => setEditRateType({ isOpen: false });

  const RateTypeModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(rateTypePost(data, closeCallback));
      return (
        <RateTypeModal
          isModalOpen={editRateType.isOpen}
          initialValues={{
            rateTypeName: '',
            unit: '',
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          title="Добавить тип тарифа"
        />
      );
    },
    [dispatch, editRateType.isOpen],
  );

  return [editRateTypeHandle, RateTypeModalMemo];
};

export default useNewRateTypeModal;
