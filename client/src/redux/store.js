import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import messageReducer from './messageSlice';

export default configureStore({
  reducer: {
    User: userReducer,
    Message: messageReducer,
  },
  devTools: true,
});
