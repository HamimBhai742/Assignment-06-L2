import { baseApi } from './baseApi';

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStats: builder.query({
      query: () => ({
        url: '/stats/home',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetAllStatsQuery } = statsApi;
