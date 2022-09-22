import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  reducers: {
    doSetUser: (state, { payload }) => {
      state.user = payload;
    }
  }
});
export const { doSetUser } = user.actions;

export default user.reducer;
