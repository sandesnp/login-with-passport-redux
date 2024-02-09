import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userLogin = createAsyncThunk(
  'user/login',
  async (user, { getState, rejectWithValue }) => {
    const userState = getState().User;
    //if the developer attempts to use this action thunk when already logged in.
    if (userState.isAuthenticated) {
      return rejectWithValue('You are already logged in, good sir.');
    }
    try {
      const response = await axios.post('/api/user/login', user);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    user: {
      username: null,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user.username = action.payload.package.username;
    }),
      builder.addCase(userLogin.rejected, (state, action) => {
        state.user.error = action.payload.package;
      });
  },
});

export default userSlice.reducer;
