import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'wallet',
  initialState: {
    users: [],
    currency: '',
    conversionRate: null
  },
  reducers: {
    fetchUsers: (state, action) => {
      state.users = action.payload;
    },
    saveCurrency: (state, action) => {
      state.currency = action.payload;
    },
    fetchConversionRate: (state, action) => {
      state.conversionRate = action.payload;
    }
  }
});

const { reducer } = slice;
export default reducer;

const { fetchUsers, fetchConversionRate, saveCurrency } = slice.actions;

export const doSaveCurrency = (symbol) => (dispatch) => {
  dispatch(saveCurrency(symbol));
};

export const doFetchUsers = (users) => (dispatch) => {
  dispatch(fetchUsers(users.users));
};

export const doFetchConversionRate = () => (dispatch) => {
  fetch(`https://api.exchangerate.host/latest?base=USD&symbols=''&amount=1`)
    .then((data) => data.json())
    .then((response) => {
      dispatch(fetchConversionRate(response.rates));
    })
    .catch((error) => console.error('Error', error));
};
