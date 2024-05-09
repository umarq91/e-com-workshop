// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
};

// Define the thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');

      return response.data.products; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);

// Create the product slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      });
  },
});

// Export the actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;

