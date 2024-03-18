import { url } from "@/config/url";
import { RootState } from "@/redux/store";
import { BaseQueryApi, FetchArgs, createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { logout, setCredential } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl : url,
  credentials: 'include',
  prepareHeaders: ( headers ,  { getState }) => {
    const token = (getState() as RootState).auth.token
    if(token){
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
})

const baseQueryWithReauth = async( args:string | FetchArgs , api: BaseQueryApi , extraOptions: any ) => {
  let result = await baseQuery(args, api, extraOptions);
  if( result?.error?.status === 403){
    console.log('Sending Refresh token');

    const refreshResult = await baseQuery('/api/v1/refresh', api , extraOptions);
    if( refreshResult?.data){
      api.dispatch(setCredential({ token: (refreshResult.data as { success:string , accessToken:string})?.accessToken , user: {}}));
      result = await baseQuery(args, api, extraOptions);
    }else{
      api.dispatch(logout({}));
    }
  }
  return result;
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: () => ({})
})