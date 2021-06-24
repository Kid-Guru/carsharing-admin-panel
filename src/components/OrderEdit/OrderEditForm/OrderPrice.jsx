import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import beautify from '../../../helpers/beautify';
import calculateRentPrice from '../../../helpers/priceHelper';
import { ratesUnitsSelectorCarry } from '../../../redux/rates/selectors';
import s from './OrderEditForm.module.scss';

function OrderPrice() {
  const {
    values: {
      dateFrom, dateTo, price, isFullTank, isNeedChildChair, isRightWheel, rate,
    }, setFieldValue,
  } = useFormikContext();
  const getRateUnits = useSelector(ratesUnitsSelectorCarry);

  useEffect(() => {
    const calculateParams = {
      rate: getRateUnits(rate),
      dateFrom,
      dateTo,
      isFullTank,
      isNeedChildChair,
      isRightWheel,
    };
    const newPrice = calculateRentPrice(calculateParams);
    setFieldValue('price', newPrice);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFrom, dateTo, isFullTank, isNeedChildChair, isRightWheel, rate]);
  return (
    <p className={s.edit__price}>
      {`Цена: ${beautify.currency(price)}`}
    </p>
  );
}

export default OrderPrice;
