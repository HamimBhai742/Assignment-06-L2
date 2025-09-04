import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findUser: builder.query({
      query: (phone: string) => ({
        url: `/user/${phone}`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    // getProfile: builder.query({
    //   query: () => '/user/profile',
    //   // Simulate API response
    //   queryFn: async () => {
    //     await new Promise((resolve) => setTimeout(resolve, 1000));

    //     return {
    //       data: {
    //         id: '1',
    //         email: 'test@example.com',
    //         firstName: 'John',
    //         lastName: 'Doe',
    //         role: 'user' as const,
    //         phone: '01712345678',
    //         balance: 5000,
    //         isVerified: true,
    //       },
    //     };
    //   },
    //   providesTags: ['User'],
    // }),

    // updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
    //   query: (updates) => ({
    //     url: '/user/profile',
    //     method: 'PUT',
    //     body: updates,
    //   }),
    //   // Simulate API response
    //   queryFn: async (updates) => {
    //     await new Promise((resolve) => setTimeout(resolve, 1500));

    //     return {
    //       data: {
    //         id: '1',
    //         email: 'test@example.com',
    //         firstName: updates.firstName || 'John',
    //         lastName: updates.lastName || 'Doe',
    //         role: 'user' as const,
    //         phone: updates.phone || '01712345678',
    //         balance: 5000,
    //         isVerified: true,
    //       },
    //     };
    //   },
    //   invalidatesTags: ['User'],
    // }),
  }),
});

export const {useFindUserQuery} = userApi;
