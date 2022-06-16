import React, { ChangeEvent, useState, useMemo } from 'react';
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { Pair, PairFull } from '../../interfaces/Pair';
import { useAxiosRequest } from '../../hooks/useAxiosRequest';
import './pairModal.css';
import Stats from '../Stats';
import { changeBoughtCurrency } from '../../store/storeSlice';
import { useAppDispatch } from '../../store';

interface Props {
  open: boolean;
  onClose: () => void;
  pair: Pair;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  outline: 'none',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const PairModal: React.FC<Props> = ({ open, onClose, pair }) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();
  const { data } = useAxiosRequest<PairFull>(
    `left/${pair.baseAddress}/right/${pair.counterAddress}`,
    'post',
    null
  );

  const buyCurrency = async () => {
    if (!value.length) {
      return setError('Field must not be empty');
    }
    onClose();

    return new Promise((resolve, reject) => {
      dispatch(
        changeBoughtCurrency({
          loading: true,
          name: pair.base,
          amount: value,
          status: '',
        })
      );

      setTimeout(() => {
        if (Math.floor(Math.random() * 2)) {
          resolve(true);
        } else {
          reject(false);
        }
      }, 3000);
    })
      .then(() => {
        dispatch(
          changeBoughtCurrency({
            loading: false,
            name: pair.base,
            amount: value,
            status: 'success',
          })
        );
      })
      .catch(() => {
        dispatch(
          changeBoughtCurrency({
            loading: false,
            name: pair.base,
            amount: value,
            status: 'error',
          })
        );
      });
  };

  const toPrice = (price: string | undefined) => {
    return price ? Math.round(Number(price)) : '';
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    setValue(e.target.value);
  };

  const totalCost = useMemo(() => {
    return (Number(value) * (Number(data?.leftPrice) || 0)).toFixed(1);
  }, [value]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="pair-modal-title">
          <Typography variant="h6" component="h2">
            {`${pair.base}/${pair.counter}`}
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Item>
              1 {pair.base} = {Number(data?.leftPrice).toFixed(5)}{' '}
              {pair.counter}
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              1 {pair.counter} = {(1 / Number(data?.leftPrice)).toFixed(5)}{' '}
              {pair.base}
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom>
                24h Trading Volume
              </Typography>
              <Typography variant="h5" component="div">
                ${toPrice(data?.volume24h)}
              </Typography>
              {data?.volumeChange24h && (
                <Stats stat={Number(data.volumeChange24h)} />
              )}
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom>
                24h Fees
              </Typography>
              <Typography variant="h5" component="div">
                ${toPrice(data?.fee24h)}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom>
                TVL
              </Typography>
              <Typography variant="h5" component="div">
                ${toPrice(data?.tvl)}
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom>
                Total tokens locked
              </Typography>
              <div className="pair-modal-coin">
                <Typography variant="body1">{pair.base}</Typography>
                <Typography variant="body1">{data?.rightLocked}</Typography>
              </div>
              <div className="pair-modal-coin">
                <Typography variant="body1">{pair.counter}</Typography>
                <Typography variant="body1">{data?.leftLocked}</Typography>
              </div>
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Buy {pair.base}</Typography>
          </Grid>
          <Grid item xs={8}>
            <TextField
              error={!!error}
              helperText={error}
              onChange={handleChange}
              value={value}
              type="number"
              fullWidth
              color="secondary"
              label={`Enter the amount of ${pair.base}`}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              className="pair-modal-button"
              variant="contained"
              fullWidth
              color="secondary"
              onClick={buyCurrency}>
              Buy
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1">
              Total cost: {totalCost} USDT
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default PairModal;
