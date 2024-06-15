// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchSingleProduct } from '../products/productSlice';

// Define the initial state
const initialState = {
    cart:[]
};

export const addToCartAsync = createAsyncThunk(
  'cart/addtoCart',
  async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/cart`,data);

      return response.data; // axios automatically parses JSON response
     
      return data
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCarts',
  async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND}/cart`);
      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);


export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (id) => {
    try {

      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND}/cart/${id}`);
      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);

export const updateCartAsync= createAsyncThunk(
  'cart/updatedCart',
  async (update) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_BACKEND}/cart/${update.id}`,update);
      return response.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;  
    }
  }
);

export const emptyCartAsync= createAsyncThunk(
  'cart/emptyCart',
  async () => {
    try {
      const response = await axios.put  (`${import.meta.env.VITE_BACKEND}/cart/empty`);
        if(response.status === 200){
          return response.data
        }
      // return response.data; // axios automatically parses JSON response
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
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      
       const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);
   
      if(existingProductIndex !== -1){
        // increase product quantity 
        state.cart[existingProductIndex].quantity+=1
      }else{
        state.cart.push(action.payload)
      }
    },
    removeCart(state, action) {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateCart(state, action) {
      const {quantity} = action.payload
      const existingProductIndex = state.cart.findIndex(item => item.id === action.payload.id);

      if(existingProductIndex !== -1){
        state.cart[existingProductIndex].quantity = quantity;  
      }
      
    },
    emptyCart(state,action) {
      state.cart = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload.product)
        state.error = null;
      })

      .addCase(fetchCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart= action.payload
        state.error = null;
      })

      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index =  state.cart.findIndex(item=>item.id===action.payload.id)
        state.cart.splice(index,1);
      })

      .addCase(updateCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        const index =  state.cart.findIndex(item=>item.id===action.payload.id)
        state.cart[index] = action.payload;
      })

      .addCase(emptyCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(emptyCartAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = []
      })

  },
});

// Export the actions and reducer
export const {addCart,removeCart,updateCart,emptyCart} = cartSlice.actions;
export default cartSlice.reducer;
