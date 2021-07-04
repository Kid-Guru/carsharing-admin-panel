import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupPoints, initialAllPointsRequest } from '../../redux/points/actions';
import { pointsTableSelector, isInitialSelector } from '../../redux/points/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Table from '../common/Table/Table';
import useEditPointModal from './Modals/useEditPointModal';
import useNewPointModal from './Modals/useNewPointModal';

const titles = [
  { title: 'Точка выдачи', width: '160px' },
  { title: 'Город', width: '160px' },
  { title: 'Адрес', width: '160px' },
];

function PointsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllPointsRequest());
    return () => dispatch(cleanupPoints());
  }, [dispatch]);
  const pointsList = useSelector(pointsTableSelector);
  const isInitial = useSelector(isInitialSelector);

  const [openEditPointModal, EditPointModal] = useEditPointModal();
  const [openNewPointModal, NewPointModal] = useNewPointModal();

  if (isInitial) return <Loader />;
  return (
    <>
      <ListContentLayout
        title="Точки выдачи"
        content={(
          <Table
            headers={titles}
            content={pointsList}
            actionBtnNew={openNewPointModal}
            actionBtnEdit={openEditPointModal}
          />
        )}
        noIndentContent
      />
      <EditPointModal />
      <NewPointModal />
    </>
  );
}

export default PointsList;
