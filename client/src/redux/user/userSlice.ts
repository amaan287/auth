import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  _id: string;
}
export interface UserState {
  currentUser: User | null;
  error: string | null;
  loading: boolean;
}
const initialState: UserState = {
  currentUser: null,

  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;

      state.loading = false;
      state.error = null;
    },
    signInFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpStart: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state: UserState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signUpFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    signoutStart: (state: UserState) => {
      state.loading = true;
      state.error = null;
    },
    signoutSuccess: (state: UserState) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signoutFailure: (state: UserState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state: UserState) => {
      state.error = null;
    },
  },
});
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,

  signoutStart,
  signoutSuccess,
  signoutFailure,
} = userSlice.actions;
export default userSlice.reducer;
