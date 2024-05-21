// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  totalProducts:0,
  error: null,
  selectedProduct:null
};

// Define the thunk for fetching products from the API
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products');
      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);


// Define the thunk for fetching products from the API
export const fetchProductsBySearch = createAsyncThunk(
  'products/fetchProductsBySearch',
  async (search) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products/search?q='+search);

      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);


export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id) => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/products/'+id);

      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);

export const fetchProductByFilter = createAsyncThunk(
  'products/fetchProductByFilter',
  async ({filter,page}) => {
    try {
      let qs = ''
      for(let key in filter){
        qs += `${key}=${filter[key]}&`
      }
      const response = await axios.get('http://localhost:5000/api/v1/products?'+qs+`page=${page}`);
      console.log(response);
      return response.data; // axios automatically parses JSON response
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
        state.totalProducts=action.payload.length
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      
      .addCase(fetchProductsBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProductsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })


      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })


      .addCase(fetchProductByFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductByFilter.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
  },
});

// Export the actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;

