import { encrypt } from "@/util/encryption";
import { setCredential } from "./authSlice";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/api/auth/registration",
        method: "POST",
        body: data,
      }),
    }),
    validateUser: builder.mutation({
      query: (data) => ({
        url: "/api/auth/validate",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/login",
        method: "POST",
        body: encrypt(JSON.stringify(data)),
      }),
      async onQueryStarted( args , { queryFulfilled , dispatch }){
        try{
          const { data } = await queryFulfilled;
          dispatch(setCredential({
            token: data.accessToken,
            user: data.user,
          }))
        }catch(error){
          console.log(error)
        }
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "GET",
      }),
    }),
    userInfo: builder.mutation({
      query: () => ({
        url: "/api/auth/user",
        method: "GET",
      }),
    })
  }),
})