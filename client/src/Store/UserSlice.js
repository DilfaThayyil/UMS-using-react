import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.profileImage=action.payload.profileImage
      state.id=action.payload.id
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.profileImage='';
      state.id=''
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
