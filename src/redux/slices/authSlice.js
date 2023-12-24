import {createSlice} from '@reduxjs/toolkit';
import QuestionDifficult from '../../enums/QuestionDifficult';

const initialScoreFilterState = {
  filter: {
    selected: {
      questionCount: null,
      difficult: QuestionDifficult.Any,
      category: null,
    },
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.user.scores = initialScoreFilterState;
    },
    removeUser: state => {
      state.user = null;
    },
    setUserSelectedScoreFilter: (state, action) => {
      state.user.scores.filter.selected = action.payload;
    },
    setUserScoreFilterCategories: (state, action) => {
      state.user.scores.filter.sections = action.payload;
    },
    clearUserScoreFilter: state => {
      state.user.scores.filter.selected =
        initialScoreFilterState.filter.selected;
    },
  },
});

export const {
  setUser,
  removeUser,
  setUserScoreFilterCategories,
  setUserSelectedScoreFilter,
  clearUserScoreFilter,
} = authSlice.actions;

export default authSlice.reducer;
