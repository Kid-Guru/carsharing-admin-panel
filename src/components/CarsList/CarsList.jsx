import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanupCars, initialAllCarsRequest, setPageCars } from '../../redux/cars/actions';
import {
  carsListSelector, isInitialSelector, pageSelector, totalCarsSelector,
} from '../../redux/cars/selectors';
import appRoutes from '../../routes/appRoutes';
import ImageCar from '../common/ImageCar/ImageCar';
import ListContentLayout from '../common/ListContentLayout/ListContentLayout';
import Loader from '../common/Loader/Loader';
import Paginator from '../common/Paginator/Paginator';
import Table from '../common/Table/Table';
import Filters from './Filters/Filters';

const titles = [
  { title: 'Модель', width: '130px' },
  { title: 'Изображение', width: '150px' },
  { title: 'Мин.цена', width: '90px' },
  { title: 'Макс.цена', width: '90px' },
  { title: 'Номер', width: '100px' },
  { title: 'Описание', width: '220px' },
  { title: 'Категория', width: '120px' },
];

const imageComp = (img) => <ImageCar imagePath={img} />;

function CarsList() {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAllCarsRequest());
    return () => dispatch(cleanupCars());
  }, [dispatch]);
  const onPageChange = ({ selected }) => dispatch(setPageCars(selected));
  const totalPages = useSelector(totalCarsSelector);
  const page = useSelector(pageSelector);
  const carsList = useSelector(carsListSelector);
  const isFetching = useSelector(isInitialSelector);

  const actionBtnNewHandler = () => history.push(appRoutes.dashboardCarNew());
  const actionBtnEditHandler = (id) => history.push(appRoutes.dashboardCarEdit(id));

  if (isFetching) return <Loader />;

  return (
    <ListContentLayout
      title="Машины"
      header={<Filters />}
      content={(
        <Table
          headers={titles}
          content={carsList(imageComp)}
          actionBtnNew={actionBtnNewHandler}
          actionBtnEdit={actionBtnEditHandler}
        />
      )}
      footer={(
        <Paginator
          onPageChange={onPageChange}
          pageCount={totalPages}
          forcePage={page}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
        />
      )}
      noIndentContent
    />
  );
}

export default CarsList;
