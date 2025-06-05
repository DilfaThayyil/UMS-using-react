import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profileImage=action.payload.profileImage
      state.id=action.payload.id
    },
    clearUser: (state) => {
      state.username = '';
      state.email = '';
      state.profileImage='';
      state.id=''
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
