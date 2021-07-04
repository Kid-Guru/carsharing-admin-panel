import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cityDelete, cityUpdate } from '../../../redux/cities/actions';
import { cityEditDataSelectorCarry } from '../../../redux/cities/selectors';
import CityModal from './CityModal';

const useEditCityModal = () => {
  const dispatch = useDispatch();
  const cityEditData = useSelector(cityEditDataSelectorCarry);
  const [editCity, setEditCity] = useState({ isOpen: false, cityName: '', id: '' });

  const editCityHandle = (id) => setEditCity({ isOpen: true, id, ...cityEditData(id) });
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
