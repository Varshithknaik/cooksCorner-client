import { RootState } from "@/redux/store";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  reducerPath: 'auth',
  name:'auth',
  initialState: { user:null , token: null},
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
    logout: (state , action) => {
      state.user = null;
      state.token = null;
    }
  }
})

export const { setCredential , setUserInfo , logout } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state: RootState) => state.auth.user;
export const  selectToken = (state: RootState) => state.auth.token;