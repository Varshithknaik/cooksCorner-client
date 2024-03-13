import { encrypt } from "@/util/encryption";
import { setCredential } from "./authSlice";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation({
      query: (data) => ({
        url: "/api/v1/register",
        method: "POST",
        body: data,
      }),
    }),
    validateUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/validate",
        method: "POST",
        body: { data :  encrypt(JSON.stringify(data))},
      }),
      async onQueryStarted( args , { queryFulfilled , dispatch }){
        try{
          const { data } = await queryFulfilled;
          dispatch(setCredential({
            token: data.token,
            user: {},
          }))
        }catch(error){
          console.log(error)
        }
      }
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/login",
        method: "POST",
        body:{ data :  encrypt(JSON.stringify(data))},
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
        url: "/api/auth/me",
        method: "GET",
      }),
    })
  }),
})

export const {
  useRegistrationMutation,
  useValidateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoMutation,
} = authApiSlice;