import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ratePost } from '../../../redux/rates/actions';
import RateModal from './RateModal';

const useNewRateModal = () => {
  const dispatch = useDispatch();
  const [editRate, setEditRate] = useState({ isOpen: false });
  const editRateHandle = () => setEditRate({ isOpen: true });
  const closeCallback = () => setEditRate({ isOpen: false });

  const RateModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(ratePost(data, closeCallback));
      return (
        <RateModal
          isModalOpen={editRate.isOpen}
          initialValues={{
            price: '',
            rateType: null,
          }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          title="Добавить тариф"
        />
      );
    },
    [dispatch, editRate.isOpen],
  );

  return [editRateHandle, RateModalMemo];
};

export default useNewRateModal;
