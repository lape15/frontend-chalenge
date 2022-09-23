import { createSlice } from '@reduxjs/toolkit';
import UserService from '../services/user.service';

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

export const fetchUserDetails = () => async (dispatch) => {
  try {
    const data = await UserService.getUser();
    dispatch(doSetUser(data.data.data));
  } catch (error) {
    console.log(error, 'WHYY');
  }
};
export default user.reducer;
