import { createSlice } from '@reduxjs/toolkit';
// Slice
const slice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    fetchUsers: (state, payload) => {
      state.users = payload;
    }
  }
});

const { reducer } = slice;
export default reducer;

const { fetchUsers } = slice.actions;

export const doFetchUsers = () => (dispatch) => {
  fetch('http://localhost:3004/users')
    .then((data) => data.json())
    .then((response) => dispatch(fetchUsers(response)))
    .catch((error) => console.log({ error }));
};
