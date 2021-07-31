import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userName: '',
    userEmail: '',
    userRole: '',
    userToken: '',
    isLogged: false,
  },
  reducers: {
    logInAction(state, action: PayloadAction<any>) {
      console.log('store do AUTH');
      state.isLogged = true;
      console.log('login-store action.payload ->', action.payload);
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userRole = action.payload.userRole;
      state.userToken = action.payload.userToken;
      localStorage.setItem('userEmail', action.payload.userEmail);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('userRole', action.payload.userRole);
      localStorage.setItem('userToken', action.payload.userToken);
    },
    signUpAction(state, action: PayloadAction<any>) {
      state.isLogged = true;
      console.log('login-store action.payload ->', action.payload);
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userRole = action.payload.userRole;
      state.userToken = action.payload.userToken;
      localStorage.setItem('userEmail', action.payload.userEmail);
      localStorage.setItem('userName', action.payload.userName);
      localStorage.setItem('userRole', action.payload.userRole);
      localStorage.setItem('userToken', action.payload.userToken);
    },
    logOutAction(state) {
      state.isLogged = false;
      state.userName = '';
      state.userEmail = '';
      state.userRole = '';
      state.userToken = '';
      localStorage.clear();
    },
    tokenAuth(state, action: PayloadAction<any>) {
      state.isLogged = true;
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userRole = action.payload.userRole;
      state.userToken = action.payload.userToken;
    },
  },
});

export const { logInAction, signUpAction, logOutAction, tokenAuth } =
  authSlice.actions;
export default authSlice.reducer;
