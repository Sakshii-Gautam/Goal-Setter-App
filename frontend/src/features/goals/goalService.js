import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://goal-setter-app-lgth.onrender.com/api/goals';

//Get Goals
export const getGoals = createAsyncThunk(
  'goal/getGoals',
  async (_, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(API_URL, config);
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

//Create a new Goal
export const createGoal = createAsyncThunk(
  'goal/create',
  async (goalData, ThunkAPI) => {
    try {
      //Getting and sending the token as creating a goal is protected
      const token = ThunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(API_URL, goalData, config);
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

//delete a Goal
export const deleteGoal = createAsyncThunk(
  'goal/delete',
  async (goalId, ThunkAPI) => {
    try {
      //Getting and sending the token as creating a goal is protected
      const token = ThunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`${API_URL}/${goalId}`, config);
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

//update a Goal
export const updateGoal = createAsyncThunk(
  'goal/update',
  async (goalData, ThunkAPI) => {
    try {
      //Getting and sending the token as updating a goal is protected
      const token = ThunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${API_URL}/${goalData._id}`,
        goalData,
        config
      );
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
