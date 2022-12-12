import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import thunk from 'redux-thunk';
import { FALSE } from 'sass';

const url = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  items: [],
  travelData: [],
  amount: 4,
  total: 0,
  isLoading: false,
}

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      const res = await axios.get(url);

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('Sth went wrong.');
    }
  }
);

 export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
    clearCart: (state) => {
      state.items = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);

    },
    increase: (state, { payload }) => {
      const cartItem = state.items.find(item => item.id == payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.items.find(item => item.id == payload.id);
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.items.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
   },
   extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    }
   }
 })

export const { clearCart, removeItem, increase, decrease, calculateTotals } = dataSlice.actions;

export default dataSlice.reducer;