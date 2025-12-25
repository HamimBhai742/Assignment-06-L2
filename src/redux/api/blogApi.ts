import { baseApi } from './baseApi';

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: '/blog/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),
    getAllBlogs: builder.query({
      query: () => ({
        url: '/blog/all',
        method: 'GET',
      }),
      providesTags: ['Blog'],
    }),
    updateBlog: builder.mutation({
      query: (data) => ({
        url: `/blog/update/${data.id || data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
