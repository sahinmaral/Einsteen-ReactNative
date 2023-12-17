import {createSlice} from '@reduxjs/toolkit';
import ModalType from '../../enums/ModalType';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    visibility: {
      chooseDifficult: false,
      chooseQuestionCount: false,
      verifySignedOut: false,
      verifyQuitQuiz: false,
      updateProfilePhoto: false,
    },
  },
  reducers: {
    openModalByType: (state, action) => {
      switch (action.payload) {
        case ModalType.VerifySignedOut:
          state.visibility = {
            verifySignedOut: true,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifyQuitQuiz: false,
            updateProfilePhoto: false,
          };
          break;
        case ModalType.ChooseDifficult:
          state.visibility = {
            chooseDifficult: true,
            chooseQuestionCount: false,
            verifySignedOut: false,
            verifyQuitQuiz: false,
            updateProfilePhoto: false,
          };
          break;
        case ModalType.ChooseQuestionCount:
          state.visibility = {
            chooseQuestionCount: true,
            chooseDifficult: false,
            verifySignedOut: false,
            verifyQuitQuiz: false,
            updateProfilePhoto: false,
          };
          break;
        case ModalType.VerifyQuitQuiz:
          state.visibility = {
            verifyQuitQuiz: true,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifySignedOut: false,
            updateProfilePhoto: false,
          };
          break;
        case ModalType.UpdateProfilePhoto:
          state.visibility = {
            updateProfilePhoto: true,
            verifyQuitQuiz: false,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifySignedOut: false,
          };
          break;
        default:
          break;
      }
    },
    closeAllModals: state => {
      state.visibility = {
        chooseQuestionCount: false,
        chooseDifficult: false,
        verifySignedOut: false,
        verifyQuitQuiz: false,
        updateProfilePhoto: false,
      };
    },
  },
});

export const {openModalByType, closeAllModals} = modalSlice.actions;

export default modalSlice.reducer;
