import { baseApi } from './baseApi';
export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: ({ status, search, limit, page }) => ({
        url: `/admin/users?${
          status !== 'all' ? `isActive=${status}` : ''
        }&search=${search}&limit=${limit}&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Admin', 'User'],
    }),
    manageUsers: builder.mutation({
      query: (data) => ({
        url: `/admin/user-status/${data.id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
    getAllAgents: builder.query({
      query: ({ status, search, limit, page }) => ({
        url: `/admin/agents?${
          status !== 'all' ? `agentStatus=${status}` : ''
        }&search=${search}&limit=${limit}&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Admin', 'User'],
    }),
    approveAgent: builder.mutation({
      query: (id) => ({
        url: `/admin/agents-approved/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Agent'],
    }),
    suspendAgent: builder.mutation({
      query: (id) => ({
        url: `/admin/agents-suspend/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Agent'],
    }),
    reactiveAgent: builder.mutation({
      query: (id) => ({
        url: `/admin/agents-reactive/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Agent'],
    }),
    getAllTransactions: builder.query({
      query: ({ limit, page, type, search, status, sort }) => ({
        url: `/admin/transactions?limit=${limit}&page=${page}&${
          type !== 'all' ? `&type=${type}` : ''
        }&search=${search}&${
          status !== 'all' ? `&status=${status}` : ''
        }&sort=${sort}`,
        method: 'GET',
      }),
      providesTags: ['Admin', 'Transaction'],
    }),
    adminOverView: builder.query({
      query: () => ({
        url: `/admin/overview`,
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),
    transactionAnalytics: builder.query({
      query: () => ({
        url: `admin/transaction-analytics`,
        method: 'GET',
      }),
      providesTags: ['Admin'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useManageUsersMutation,
  useDeleteUserMutation,
  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useReactiveAgentMutation,
  useGetAllTransactionsQuery,
  useAdminOverViewQuery,
  useTransactionAnalyticsQuery,
} = adminApi;
