import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,

  reducers: {
    setGoals: (state, action) => {
      state.goals = action.payload;
    },

    addGoal: (state, action) => {
      state.goals.push(action.payload);
    },

    deleteGoal: (state, action) => {
      state.goals = state.goals.filter(
        (goal) => goal._id !== action.payload
      );
    },
  },
});

export const {
  setGoals,
  addGoal,
  deleteGoal,
} = goalsSlice.actions;

export default goalsSlice.reducer;