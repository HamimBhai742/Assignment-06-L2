import { useState } from 'react';
import {
  useGetAllBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} from '@/redux/api/blogApi';
import { ImSpinner9 } from 'react-icons/im';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  content: string;
  tags: string[];
  readTime: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

const ManageBlogs = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);
  const [createBlog, { isLoading: isCreating }] = useCreateBlogMutation();
  const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    category: '',
    excerpt: '',
    image: '',
    readTime: '',
    tags: [] as string[],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDatas = new FormData();
      if (formData) formDatas.append('data', JSON.stringify(formData));
      if (imageFile) formDatas.append('file', imageFile as Blob);
      if (editingBlog) {
        const { data, error } = await updateBlog({
          id: editingBlog._id,
          ...formData,
        });
        console.log(editingBlog, formData, formDatas,imageFile);
        if (data) {
          setIsModalOpen(false);
          toast.success(data.message);
        }
        if (error) {
          toast.error((error as { data: { message: string } }).data.message);
        }
      } else {
        const { data, error } = await createBlog(formDatas);
        if (data) {
          setIsModalOpen(false);
          toast.success(data.message);
        }
        if (error) {
          const err = error as { data: { message: string } };
          toast.error(err.data.message);
        }
      }
      setEditingBlog(null);
      setImageFile(null);
      setFormData({
        title: '',
        content: '',
        author: '',
        category: '',
        excerpt: '',
        image: '',
        readTime: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      excerpt: blog.excerpt,
      image: blog.image,
      readTime: blog.readTime,
      tags: blog.tags,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this blog?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Deleted!',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }).then(async (result: { isConfirmed: any }) => {
      if (result.isConfirmed) {
        const { data, error } = await deleteBlog(id);
        if (data) {
          toast.success(data.message);
        }
        if (error) {
          const err = error as { data: { message: string } };
          toast.error(err.data.message);
        }
      }
    });
  };

  const openCreateModal = () => {
    setEditingBlog(null);
    setImageFile(null);
    setFormData({
      title: '',
      content: '',
      author: '',
      category: '',
      excerpt: '',
      image: '',
      readTime: '',
      tags: [],
    });
    setIsModalOpen(true);
  };

  if (isLoading)
    return <div className='flex justify-center p-8'>Loading...</div>;

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Manage Blogs</h1>
        <button
          onClick={openCreateModal}
          className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-purple-700 font-semibold shadow-lg hover:shadow-xl transition-all duration-200'
        >
          Create Blog
        </button>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {blogs?.data?.map((blog: Blog) => (
          <div
            key={blog._id}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden group'
          >
            {blog.image && (
              <div className='h-48 overflow-hidden'>
                <img
                  src={blog.image}
                  alt={blog.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
            )}
            <div className='p-6'>
              <div className='flex items-center gap-2 mb-3'>
                <span className='px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full'>
                  {blog.category}
                </span>
                <span className='text-xs text-gray-500 dark:text-gray-400'>
                  {blog.readTime}
                </span>
              </div>

              <h3 className='font-bold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                {blog.title}
              </h3>

              <p className='text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2'>
                {blog.excerpt}
              </p>

              <div className='flex flex-wrap gap-1 mb-4'>
                {blog.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded'
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700'>
                <div className='flex items-center gap-2'>
                  <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xs'>
                    {blog.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      {blog.author}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex gap-2 pt-4 justify-between items-center'>
                <button
                  onClick={() => handleEdit(blog)}
                  className='flex items-center gap-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
                    />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className='flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors'
                >
                  <svg
                    className='w-4 h-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
          <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden'>
            <div className='p-6 border-b border-gray-100 dark:border-gray-800'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
                    <svg
                      className='w-5 h-5 text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                      />
                    </svg>
                  </div>
                  <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                    {editingBlog ? 'Edit Blog Post' : 'Create New Blog'}
                  </h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className='w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors'
                >
                  <svg
                    className='w-4 h-4 text-gray-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className='p-6 space-y-4 max-h-[70vh] overflow-y-auto'
            >
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    Blog Title
                  </label>
                  <input
                    type='text'
                    defaultValue={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='Enter title...'
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    Author Name
                  </label>
                  <input
                    type='text'
                    value={formData.author}
                    onChange={(e) =>
                      setFormData({ ...formData, author: e.target.value })
                    }
                    className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='Author name...'
                    required
                  />
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    required
                  >
                    <option value=''>Select category</option>
                    <option value='Technology'>Technology</option>
                    <option value='Finance'>Finance</option>
                    <option value='Business'>Business</option>
                    <option value='Lifestyle'>Lifestyle</option>
                    <option value='Education'>Education</option>
                  </select>
                </div>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                  placeholder='Brief description...'
                  rows={2}
                  required
                />
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Tags (press Enter to add)
                </label>
                <div className='space-y-2'>
                  {formData.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className='inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full'
                        >
                          #{tag}
                          <button
                            type='button'
                            onClick={() => {
                              const newTags = formData.tags.filter(
                                (_, i) => i !== index
                              );
                              setFormData({ ...formData, tags: newTags });
                            }}
                            className='ml-1 text-blue-500 hover:text-blue-700'
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <input
                    type='text'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value && !formData.tags.includes(value)) {
                          setFormData({
                            ...formData,
                            tags: [...formData.tags, value],
                          });
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                    className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='Type a tag and press Enter...'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className='w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                  placeholder='Write your blog content here...'
                  rows={4}
                  required
                />
              </div>

              <div className='flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800'>
                {editingBlog ? (
                  <button
                    type='submit'
                    className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl'
                  >
                    {isUpdating ? (
                      <span className='flex items-center gap-2 justify-center'>
                        <ImSpinner9 className='animate-spin' /> Updating...
                      </span>
                    ) : (
                      'Update Blog'
                    )}
                  </button>
                ) : (
                  <button
                    type='submit'
                    className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl'
                  >
                    {isCreating ? (
                      <span className='flex items-center gap-2 justify-center'>
                        <ImSpinner9 className='animate-spin' /> Creating...
                      </span>
                    ) : (
                      'Create Blog'
                    )}
                  </button>
                )}

                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200'
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
