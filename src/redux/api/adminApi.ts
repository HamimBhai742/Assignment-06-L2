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

interface Agent {
  id: string;
  agentId: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'suspended';
  balance: number;
  commission: number;
  location: string;
  shopName: string;
  joinedAt: string;
  lastActive: string;
  totalTransactions: number;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminStats: builder.query<AdminStats, void>({
      query: () => '/admin/stats',
      providesTags: ['Admin'],
    }),
    getAllUsers: builder.query({
      query: ({ status }) => ({
        url: `/admin/users?${status !== 'all' ? `isActive=${status}` : ''}`,
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
    getAllAgents: builder.query<Agent[], void>({
      query: () => '/admin/agents',
      providesTags: ['Admin', 'Agent'],
    }),
    approveAgent: builder.mutation<void, string>({
      query: (agentId) => ({
        url: `/admin/agents/${agentId}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Agent'],
    }),
    suspendAgent: builder.mutation<void, string>({
      query: (agentId) => ({
        url: `/admin/agents/${agentId}/suspend`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Agent'],
    }),
    reactivateAgent: builder.mutation<void, string>({
      query: (agentId) => ({
        url: `/admin/agents/${agentId}/reactivate`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Admin', 'Agent'],
    }),
  }),
});

export const {
  useGetAdminStatsQuery,
  useGetAllUsersQuery,
  useManageUsersMutation,
  useDeleteUserMutation,
  useGetAllAgentsQuery,
  useApproveAgentMutation,
  useSuspendAgentMutation,
  useReactivateAgentMutation,
} = adminApi;
