import { Link } from 'react-router';
import type { BlogPost } from './Blogs';

const BlogCard = ({ blog }:{blog:BlogPost}) => {
  return (
    <Link to={`/blog/${blog.slug}`} className='group'>
      <div className='bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800'>
        {/* Image */}
        <div className='relative h-52 overflow-hidden'>
          <img
            src={blog.image}
            alt={blog.title}
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
          />
          <span className='absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-blue-600 text-white shadow'>
            {blog.category}
          </span>
        </div>

        {/* Content */}
        <div className='p-6'>
          {/* Meta */}
          <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3'>
            <span>{blog.author}</span>
            <span>{blog.readTime}</span>
          </div>

          {/* Title */}
          <h3 className='text-xl hover:text-blue-600 dark:hover:text-blue-400 font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors'>
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className='text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3'>
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div className='flex flex-wrap gap-2'>
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className='text-xs px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
