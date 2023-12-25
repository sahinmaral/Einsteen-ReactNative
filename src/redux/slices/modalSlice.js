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
            filterScoresByQuestionDifficult: false,
            filterScoresByQuestionCategory: false,
            filterScoresByQuestionCount: false,
          };
          break;
        case ModalType.ChooseQuestionCount:
          state.visibility = {
            chooseQuestionCount: true,
            chooseDifficult: false,
            verifySignedOut: false,
            verifyQuitQuiz: false,
            updateProfilePhoto: false,
            filterScoresByQuestionDifficult: false,
            filterScoresByQuestionCategory: false,
            filterScoresByQuestionCount: false,
          };
          break;
        case ModalType.VerifyQuitQuiz:
          state.visibility = {
            verifyQuitQuiz: true,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifySignedOut: false,
            updateProfilePhoto: false,
            filterScoresByQuestionDifficult: false,
            filterScoresByQuestionCategory: false,
            filterScoresByQuestionCount: false,
          };
          break;
        case ModalType.UpdateProfilePhoto:
          state.visibility = {
            updateProfilePhoto: true,
            verifyQuitQuiz: false,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifySignedOut: false,
            filterScoresByQuestionDifficult: false,
            filterScoresByQuestionCategory: false,
            filterScoresByQuestionCount: false,
          };
          break;
        case ModalType.FilterScoresByQuestionDifficult:
          state.visibility = {
            filterScoresByQuestionDifficult: true,
            filterScoresByQuestionCategory: false,
            filterScoresByQuestionCount: false,
            updateProfilePhoto: false,
            verifyQuitQuiz: false,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifySignedOut: false,
          };
          break;
        case ModalType.FilterScoresByQuestionCategory:
          state.visibility = {
            filterScoresByQuestionCategory: true,
            filterScoresByQuestionDifficult: false,
            filterScoresByQuestionCount: false,
            updateProfilePhoto: false,
            verifyQuitQuiz: false,
            chooseDifficult: false,
            chooseQuestionCount: false,
            verifySignedOut: false,
          };
          break;
        case ModalType.FilterScoresByQuestionCount:
          state.visibility = {
            filterScoresByQuestionCount: true,
            filterScoresByQuestionDifficult: false,
            filterScoresByQuestionCategory: false,
            updateProfilePhoto: false,
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
        filterScoresByQuestionCount: false,
        filterScoresByQuestionDifficult: false,
        filterScoresByQuestionCategory: false,
        updateProfilePhoto: false,
        verifyQuitQuiz: false,
        chooseDifficult: false,
        chooseQuestionCount: false,
        verifySignedOut: false,
      };
    },
  },
});

export const {openModalByType, closeAllModals} = modalSlice.actions;

export default modalSlice.reducer;
