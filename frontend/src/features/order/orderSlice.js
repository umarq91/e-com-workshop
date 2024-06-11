// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
    orders:[],
    status:'idle',
    currentOrder:null
};

export const createOrder = createAsyncThunk(
  'products/createOrder',
  async (order) => {
    try {
      const response = await axios.post('http://localhost:5000/api/v1/orders',order);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchLoggedInUserOrders = createAsyncThunk(
  'products/fetchLoggedInUserOrders',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/orders/own');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define the thunk for fetching products from the API
// export const fetchProducts = createAsyncThunk(
//   'products/fetchProducts',
//   async () => {
//     try {
//       const response = await axios.get('https://fakestoreapi.com/products');
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// Create the product slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload);
        state.currentOrder=null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      .addCase(fetchLoggedInUserOrders.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload;
        state.currentOrder=null
      })
  },
});

// Export the actions and reducer
export const {} = orderSlice.actions;
export default orderSlice.reducer;
