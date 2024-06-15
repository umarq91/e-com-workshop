import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  products: [],
  loading: false,
  totalProducts: 0,
  error: null,
  selectedProduct: null,
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

// Define the thunk for fetching products by search from the API
export const fetchProductsBySearch = createAsyncThunk(
  'products/fetchProductsBySearch',
  async (search) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/products/search?q=${search}`);
      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);

// Define the thunk for fetching a single product from the API
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Define the thunk for fetching products by filter and pagination from the API
export const fetchProductByFilter = createAsyncThunk(
  'products/fetchProductByFilter',
  async ({ filter, page }) => {
    try {
      let qs = '';
      for (let key in filter) {
        qs += `${key}=${filter[key]}&`;
      }
      const response = await axios.get(`http://localhost:5000/api/v1/products?${qs}page=${page}`);
      return response.data; // Ensure this includes a total count if necessary
    } catch (error) {
      throw error;
    }
  }
);

// Define the thunk for creating a new product
export const createProductAsync = createAsyncThunk(
  'products/createProduct',
  async (product) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/products`, product);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND}/products/${product.id}`, product);
      return response.data;
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
        state.products = action.payload.products;
        state.totalProducts = action.payload.total; // Set total products
        state.error = null;
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
        state.products = action.payload.products;
        state.totalProducts = action.payload.total; // Set total products
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
        state.products = action.payload.products;
        state.totalProducts = action.payload.total; // Set total products
        state.error = null;
      })
      .addCase(fetchProductByFilter.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(createProductAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something went wrong!";
      })

      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;
      });
  },
});

// Export the actions and reducer
export const {} = productSlice.actions;
export default productSlice.reducer;
