import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

type Login = {
  username: string;
  password: string;
};

export interface AuthState {
  user?: Login;
}

const initialState: AuthState = {
  user: undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Login>) => {
      state.user = action.payload;
    },
    logout: state => {
      state.user = undefined;
    },
  },
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;
