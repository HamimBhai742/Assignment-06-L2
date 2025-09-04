import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/a5',
    credentials: 'include',
  }),
  tagTypes: ['Auth', 'User', 'Transaction'],
  endpoints: () => ({}),
});
