import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cityPost } from '../../../redux/cities/actions';
import CityModal from './CityModal';

const useNewCityModal = () => {
  const dispatch = useDispatch();
  const [editCity, setEditCity] = useState({ isOpen: false });
  const editCityHandle = () => setEditCity({ isOpen: true });
  const closeCallback = () => setEditCity({ isOpen: false });

  const CityModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(cityPost(data, closeCallback));
      return (
        <CityModal
          isModalOpen={editCity.isOpen}
          initialValues={{ cityName: '' }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          title="Редактировать город"
        />
      );
    },
    [dispatch, editCity.isOpen],
  );

  return [editCityHandle, CityModalMemo];
};

export default useNewCityModal;
