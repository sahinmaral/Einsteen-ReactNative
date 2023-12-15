import {configureStore} from '@reduxjs/toolkit';
import questionSlice from './slices/questionSlice';
import authSlice from './slices/authSlice'

export default configureStore({
  reducer: {
    question: questionSlice,
    auth: authSlice
  },
});
