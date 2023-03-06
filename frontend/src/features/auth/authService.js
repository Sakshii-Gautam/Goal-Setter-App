import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = ' http://localhost:5000/api/users';

//Register user
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, ThunkAPI) => {
    try {
      const response = await axios.post(API_URL, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, ThunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

//Logout user
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  await localStorage.removeItem('user');
});
