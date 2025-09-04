import { baseApi } from './baseApi';

interface LoginRequest {
  phone: string;
  password: string;
}

interface IUser {
  _id: string;
  name: string;
  role: 'user' | 'agent';
  phone: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    user: IUser;
  };
}

interface LoginResponse {
  data: {
    id: string;
    role: 'user' | 'agent' | 'admin';
    phone: string;
  };
}

export interface LogOutResponse {
  message: string;
  statusCode: number;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: '/user/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        credentials: 'include',
      }),
      invalidatesTags: ['Auth'],
    }),
    checkLogin: builder.query<LoginResponse, void>({
      query: () => '/auth/check',
      providesTags: ['Auth'],
    }),
    logout: builder.mutation<LogOutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
  }),
});

export const {useCreateAccountMutation, useLoginMutation, useLogoutMutation, useCheckLoginQuery } =
  authApi;
