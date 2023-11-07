// intuitSlice.js
import { createSlice } from '@reduxjs/toolkit';

const intuitSlice = createSlice({
  name: 'intuit',
  initialState: {
    transections: null,
  },
  reducers: {
    setTransections: (state, action) => {
      state.transections = action.payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { setTransections, decrement } = intuitSlice.actions;
export default intuitSlice.reducer;
