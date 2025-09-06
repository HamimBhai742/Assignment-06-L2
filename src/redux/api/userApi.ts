import { baseApi } from './baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    findUser: builder.query({
      query: (phone: string) => ({
        url: `/user/${phone}`,
        method: 'GET',
      }),
      providesTags: ['User', 'Agent'],
    }),
    myProfile: builder.query({
      query: () => ({
        url: '/user/me',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: '/user/update',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    changePin: builder.mutation({
      query: (data) => ({
        url: '/user/change-pin',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    matchUserPin: builder.mutation({
      query: (data) => ({
        url: `/user/match-pin/${data.phone}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useFindUserQuery,
  useMyProfileQuery,
  useUpdateUserMutation,
  useChangePinMutation,
  useMatchUserPinMutation
} = userApi;
