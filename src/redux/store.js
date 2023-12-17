import {configureStore} from '@reduxjs/toolkit';
import questionSlice from './slices/questionSlice';
import authSlice from './slices/authSlice'
import modalSlice from './slices/modalSlice'

export default configureStore({
  reducer: {
    question: questionSlice,
    auth: authSlice,
    modal: modalSlice
  },
});
