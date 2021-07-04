import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupStatuses, initialAllStatusesRequest } from '../../redux/statuses/actions';
import { statusesTableSelector, isInitialSelector } from '../../redux/statuses/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Table from '../common/Table/Table';
import useEditStatusModal from './Modals/useEditStatusModal';
import useNewStatusModal from './Modals/useNewStatusModal';

const titles = [
  { title: 'Название', width: '140px' },
];

function StatusesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllStatusesRequest());
    return () => dispatch(cleanupStatuses());
  }, [dispatch]);
  const statusesList = useSelector(statusesTableSelector);
  const isInitial = useSelector(isInitialSelector);

  const [openEditStatusModal, EditStatusModal] = useEditStatusModal();
  const [openNewStatusModal, NewStatusModal] = useNewStatusModal();

  if (isInitial) return <Loader />;
  return (
    <>
      <ListContentLayout
        title="Статусы заказов"
        content={(
          <Table
            headers={titles}
            content={statusesList}
            actionBtnNew={openNewStatusModal}
            actionBtnEdit={openEditStatusModal}
          />
        )}
        noIndentContent
      />
      <EditStatusModal />
      <NewStatusModal />
    </>
  );
}

export default StatusesList;
