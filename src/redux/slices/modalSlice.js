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
          };
          break;
        case ModalType.ChooseDifficult:
          state.visibility = {
            chooseDifficult: true,
            chooseQuestionCount: false,
            verifySignedOut: false,
            verifyQuitQuiz: false,
          };
          break;
        case ModalType.ChooseQuestionCount:
          state.visibility = {
            chooseQuestionCount: true,
            chooseDifficult: false,
            verifySignedOut: false,
            verifyQuitQuiz: false,
          };
          break;
        case ModalType.VerifyQuitQuiz:
          state.visibility = {
            verifyQuitQuiz: true,
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
        chooseDifficult: false,
        chooseQuestionCount: false,
        verifySignedOut: false,
        verifyQuitQuiz: false,
      };
    },
  },
});

export const {openModalByType, closeAllModals} = modalSlice.actions;

export default modalSlice.reducer;
