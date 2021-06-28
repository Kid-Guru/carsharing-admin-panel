import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanupStatuses, initialAllStatusesRequest } from '../../redux/statuses/actions';
import { statusesTableSelector, isInitialSelector } from '../../redux/statuses/selectors';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import StatusesListTable from './StatusesListTable/StatusesListTable';
import useEditStatusModal from './Modals/useEditStatusModal';
import useNewStatusModal from './Modals/useNewStatusModal';

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
          <StatusesListTable
            statusesList={statusesList}
            editStatusHandle={openEditStatusModal}
            newStatusHandle={openNewStatusModal}
          />
        )}
        noIndentContent
        leftAlignment
      />
      <EditStatusModal />
      <NewStatusModal />
    </>
  );
}

export default StatusesList;
