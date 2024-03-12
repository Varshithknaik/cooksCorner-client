import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  reducerPath: 'auth',
  name:'auth',
  initialState: { user:null , token: null ,  registrationInfo: null},
  reducers: {
    setCredential : ( state , action ) => {
      const { user , token} = action.payload;
      state.user = user;
      state.token = token;
    },
    setUserInfo: (state , action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setRegistrationInfo: ( state , action ) => {
      const { registrationInfo } = action.payload;
      state.user = registrationInfo;
    },
    logout: (state , action) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setCredential , setUserInfo , setRegistrationInfo , logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectRegistrationInfo = (state: RootState) => state.auth.registrationInfo;