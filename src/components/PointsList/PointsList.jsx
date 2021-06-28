import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupPoints, initialAllPointsRequest } from '../../redux/points/actions';
import { pointsTableSelector, isInitialSelector } from '../../redux/points/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import PointsListTable from './PointsListTable/PointsListTable';
import useEditPointModal from './Modals/useEditPointModal';
import useNewPointModal from './Modals/useNewPointModal';

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
          <PointsListTable
            pointsList={pointsList}
            editPointHandle={openEditPointModal}
            newPointHandle={openNewPointModal}
          />
        )}
        noIndentContent
        leftAlignment
      />
      <EditPointModal />
      <NewPointModal />
    </>
  );
}

export default PointsList;
