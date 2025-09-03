import { baseApi } from './baseApi';

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    _id: string;
    name: string;
    role: 'user' | 'agent';
    phone: string;
  };
  token: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
