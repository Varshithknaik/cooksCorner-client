import { decrypt, encrypt } from "@/util/encryption";
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
    validateUser: builder.mutation({
      query: (data) => ({
        url: "/api/v1/validate",
        method: "POST",
        body: { data :  encrypt(JSON.stringify(data))},
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/api/v1/login",
        method: "POST",
        body:{ data :  encrypt(JSON.stringify(data))},
      }),
      invalidatesTags: ['User'],
      async onQueryStarted( args , { queryFulfilled , dispatch }){
        try{
          const { data } = await queryFulfilled;
          const { accessToken , user } = JSON.parse(decrypt(data.data));
          console.log(accessToken, user);
          dispatch(setCredential({
            token: accessToken,
            user: user,
          }))
        }catch(error){
          console.log(error)
        }
      }
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/v1/logout",
        method: "GET",
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/api/v1/me",
        method: "GET",
      }),
      // providesTags: ['User']
    })
  }),
})

export const {
  useRegistrationMutation,
  useValidateUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
} = authApiSlice;