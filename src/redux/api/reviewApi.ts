import { baseApi } from './baseApi';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: '/review/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),
    getAllReviews: builder.query({
      query: () => ({
        url: '/review/all',
        method: 'GET',
      }),
      providesTags: ['Blog'],
    }),
    getMyReviews: builder.query({
      query: () => ({
        url: '/review/me',
        method: 'GET',
      }),
      providesTags: ['Blog'],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery , useGetMyReviewsQuery} = reviewApi;
