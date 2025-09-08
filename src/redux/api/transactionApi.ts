import { baseApi } from './baseApi';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyTransactions: builder.query({
      query: ({ limit, page, type, search, status, sort }) => ({
        url: `/transactions/me?limit=${limit}&page=${page}&${
          type !== 'all' ? `&type=${type}` : ''
        }&search=${search}&${
          status !== 'all' ? `&status=${status}` : ''
        }&sort=${sort}`,
        method: 'GET',
      }),
      providesTags: ['Transaction'],
    }),
    todayTotalTransactions: builder.query({
      query: () => ({
        url: `/transactions/today-total-transactions`,
        method: 'GET',
      }),
      providesTags: ['Transaction'],
    }),
    lastMonthTransactions: builder.query({
      query: () => ({
        url: `/transactions/last-month-transactions`,
        method: 'GET',
      }),
      providesTags: ['Transaction'],
    }),
    
  }),

});

export const {
  useGetMyTransactionsQuery,
  useTodayTotalTransactionsQuery,
  useLastMonthTransactionsQuery,
} = transactionApi;
