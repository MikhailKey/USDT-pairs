import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { Pair } from '../interfaces/Pair';
import { RootState } from './index';

type InitialState = {
  favourites: {
    [key: string]: Pair;
  };
  boughtCurrency: BoughtCurrency;
};

type BoughtCurrency = {
  loading: boolean;
  name: string;
  amount: string;
  status: string;
};

const initialState: InitialState = {
  favourites: {},
  boughtCurrency: {
    loading: false,
    name: '',
    amount: '',
    status: '',
  },
};

const storeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFavourites: (state, { payload }) => {
      const uniqueId = `${payload.base}/${payload.counter}`;
      let alreadyInFavorites = state.favourites[uniqueId]?.counter;

      state.favourites = {
        ...state.favourites,
        [uniqueId]: alreadyInFavorites ? false : payload,
      };
    },
    setBoughtCurrency: (state, { payload }) => {
      state.boughtCurrency = payload;
    },
  },
});

export const { setFavourites, setBoughtCurrency } = storeSlice.actions;

export const favouritesSelect = (state: RootState) => state.store.favourites;
export const boughtCurrencySelect = (state: RootState) =>
  state.store.boughtCurrency;

export const toggleFavorite = (pair: Pair) => (dispatch: Dispatch) => {
  dispatch(setFavourites(pair));
};

export const changeBoughtCurrency =
  (currency: BoughtCurrency) => (dispatch: Dispatch) => {
    dispatch(setBoughtCurrency(currency));
  };

export default storeSlice.reducer;
