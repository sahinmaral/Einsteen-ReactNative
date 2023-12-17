import {createSlice} from '@reduxjs/toolkit';
import QuestionDifficult from '../../enums/QuestionDifficult';

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questions: [],
    competition: {
      selected: {
        difficult: QuestionDifficult.Any,
        questionCount: 10,
        category: null
      },
      currentQuestion: 0,
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
    selectDifficultOfCompetition: (state, action) => {
      state.competition.selected.difficult = action.payload;
    },
    selectQuestionCountOfCompetition: (state, action) => {
      state.competition.selected.questionCount = action.payload;
    },
    selectCategoryOfCompetition: (state, action) => {
      state.competition.selected.category = action.payload;
    },
    setResultTypeOfCompetition: (state, action) => {
      state.competition.result = action.payload
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
  selectQuestionCountOfCompetition,
  selectDifficultOfCompetition,
  selectCategoryOfCompetition,
  setResultTypeOfCompetition
} = questionSlice.actions;

export default questionSlice.reducer;
