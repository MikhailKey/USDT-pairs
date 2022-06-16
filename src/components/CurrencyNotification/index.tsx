import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  boughtCurrencySelect,
  changeBoughtCurrency,
} from '../../store/storeSlice';
import { AlertColor } from '@mui/material/Alert/Alert';

const CurrencyNotification: React.FC = () => {
  const boughtCurrency = useAppSelector(boughtCurrencySelect);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(
      changeBoughtCurrency({
        loading: false,
        name: '',
        amount: '',
        status: '',
      })
    );
  };

  const message =
    boughtCurrency.status === 'success'
      ? `Successfully bought ${boughtCurrency.amount} ${boughtCurrency.name}`
      : 'Something went wrong, please try again';

  return (
    <Snackbar
      open={!!boughtCurrency.status}
      autoHideDuration={6000}
      onClose={handleClose}>
      <Alert
        severity={boughtCurrency.status as AlertColor}
        sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CurrencyNotification;
