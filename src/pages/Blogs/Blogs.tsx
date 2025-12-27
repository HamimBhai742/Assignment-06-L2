import { useGetAllBlogsQuery } from '@/redux/api/blogApi';
import { useState } from 'react';
import { Link } from 'react-router';
import BlogPostSkeleton from './BlogPostSkeleton';

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

const Blogs = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const categories = [
    'All',
    'Technology',
    'Security',
    'Tutorial',
    'Finance',
    'Education',
  ];
  const { data, isLoading } = useGetAllBlogsQuery(
    { search: searchTerm, category: selectedCategory },
    {
      refetchOnFocus: true,
    }
  );
  const blogs = data?.data;
  console.log(blogs)
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Search and Filter Section */}
        <div className='mb-12 animate-fadeInUp animation-delay-400'>
          <div className='flex flex-col md:flex-row gap-6 items-center justify-between'>
            {/* Search Bar */}
            <div className='relative flex-1 max-w-md'>
              <input
                type='text'
                placeholder='Search articles...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              />
              <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl'>
                🔍
              </span>
            </div>

            {/* Category Filter */}
            <div className='flex flex-wrap gap-2'>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {isLoading
            ? [...Array(6)].map((_, i) => <BlogPostSkeleton key={i} />)
            : blogs.map((post: BlogPost, index: number) => (
                <article
                  key={post?._id}
                  className='bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-100 dark:border-gray-700 animate-fadeInUp'
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Post Image/Icon */}
                  <div>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='rounded-t-xl h-48 w-full'
                    />
                  </div>

                  <div className='p-6'>
                    {/* Category Badge */}
                    <div className='flex items-center justify-between mb-3'>
                      <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full'>
                        {post.category}
                      </span>
                      <span className='text-gray-500 dark:text-gray-400 text-sm'>
                        {post.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <Link to={`/blog/${post.slug}`}>
                      <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer'>
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3'>
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className='flex flex-wrap gap-2 mb-4'>
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-md'
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Author and Date */}
                    <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                          <span className='text-white text-sm font-medium'>
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className='text-sm font-medium text-gray-900 dark:text-white'>
                            {post.author}
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            {post.date}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors'
                      >
                        <span className='text-lg'>→</span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
        </div>

        {/* No Results */}
        {blogs?.length === 0 && (
          <div className='text-center py-16 animate-fadeIn'>
            <div className='text-6xl mb-4'>📭</div>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
              No articles found
            </h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Blogs;
