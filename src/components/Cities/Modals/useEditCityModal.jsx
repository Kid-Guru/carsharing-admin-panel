import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cityDelete, cityUpdate } from '../../../redux/cities/actions';
import CityModal from './CityModal';

const useEditCityModal = () => {
  const dispatch = useDispatch();
  const [editCity, setEditCity] = useState({ isOpen: false, cityName: '', id: '' });
  const editCityHandle = ({ cityName, id }) => () => {
    setEditCity({ isOpen: true, cityName, id });
  };
  const closeCallback = () => setEditCity({ isOpen: false, cityName: '', id: '' });

  const CityModalMemo = useCallback(
    () => {
      const onSubmitHandle = (data) => dispatch(cityUpdate(data, closeCallback));
      const handleDelete = (id) => dispatch(cityDelete(id, closeCallback));
      return (
        <CityModal
          isModalOpen={editCity.isOpen}
          initialValues={{ cityName: editCity.cityName, id: editCity.id }}
          closeCallback={closeCallback}
          onSubmitHandle={onSubmitHandle}
          handleDelete={handleDelete}
          title="Редактировать город"
        />
      );
    },
    [dispatch, editCity.cityName, editCity.id, editCity.isOpen],
  );

  return [editCityHandle, CityModalMemo];
};

export default useEditCityModal;
