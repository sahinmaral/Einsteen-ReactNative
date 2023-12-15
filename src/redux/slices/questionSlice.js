import {createSlice} from '@reduxjs/toolkit';

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
    competition: {
      currentQuestion: 0,
      totalQuestion: 0,
      correctQuestion: 0,
      wrongQuestion: 0,
      totalQuestion: 0,
      totalEstimated: 0,
    },
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    increaseCorrectQuestion: state => {
      state.competition.correctQuestion += 1;
    },
    increaseTotalEstimated: (state, action) => {
      state.competition.totalEstimated += action.payload;
    },
    moveToNextQuestion: state => {
      state.competition.currentQuestion += 1;
    },
    setTotalQuestionOfCompetition: (state, action) => {
      state.competition.totalQuestion = action.payload;
    },
    resetCompetitionState: state => {
      state.competition = {
        currentQuestion: 0,
        totalQuestion: 0,
        correctQuestion: 0,
        wrongQuestion: 0,
        totalQuestion: 0,
        totalEstimated: 0,
      };
    },
  },
});

export const {
  setQuestions,
  resetCompetitionState,
  setTotalQuestionOfCompetition,
  increaseCorrectQuestion,
  increaseTotalEstimated,
  moveToNextQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
