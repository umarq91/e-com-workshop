// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';

// Define the initial state
const initialState = {
  userInfo:null
};

// Define the thunk for fetching products from the API
export const loginInfo = createAsyncThunk(
  'products/login',
  async ({email,password}) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/auth`,{email,password});

      return response.data.data; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ name, email, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/sign-up`, { name, email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (data) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND}/user`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
)
  

// when page refreshes or loads it should goto userInfo
export const fetchUserInfo = createAsyncThunk(
  'products/fetchProductsBySearch',
  async (search) => {
    try {
      const response = await axios.get('https://dummyjson.com/products/search?q='+search);

      return response.data.products; // axios automatically parses JSON response
    } catch (error) {
      throw error;
    }
  }
);



// Create the product slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state,action) => {
      state.userInfo = action.payload
    },
    logout: (state) => {
      state.userInfo = null
    },
    signUp: (state, action) => {
      state.userInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginInfo.pending, (state) => {
        state.loading = true;
      })
    .addCase(updateUserAsync.fulfilled, (state, action) => {
      state.userInfo = action.payload
    })
  }
});

// Export the actions and reducer
export const {login,logout} = authSlice.actions;
export default authSlice.reducer;

