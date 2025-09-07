import { baseApi } from './baseApi';

interface AdminStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  userGrowth: number;
  agentGrowth: number;
  transactionGrowth: number;
  volumeGrowth: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked' | 'pending';
  balance: number;
  joinedAt: string;
  lastActive: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      query: () => '/admin/stats',
      providesTags: ['Admin'],
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => '/admin/users',
      providesTags: ['Admin', 'User'],
    }),
    blockUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}/block`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
    unblockUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}/unblock`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Admin', 'User'],
    }),
  }),
});

export const { 
  useGetAdminStatsQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation
} = adminApi;
