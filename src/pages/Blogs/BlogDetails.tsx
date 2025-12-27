import { useParams, Link } from 'react-router';
import { useGetSingleBlogQuery } from '@/redux/api/blogApi';
import BlogDetailsSkeleton from './BlogDetailsSkeleton';

const BlogDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, isLoading } = useGetSingleBlogQuery(slug, {
    refetchOnFocus: true,
  });
  const post = data?.data;

  if (isLoading) {
    return <BlogDetailsSkeleton />;
  }

  if (!post) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-6xl mb-4'>📭</div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
            Blog post not found
          </h1>
          <Link
            to='/blogs'
            className='text-blue-600 dark:text-blue-400 hover:underline'
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      {/* Header */}
      <div className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <Link
            to='/blogs'
            className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors'
          >
            <span className='mr-2'>←</span>
            Back to Blogs
          </Link>

          <div className='mb-6'>
            <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full'>
              {post.category}
            </span>
          </div>

          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp'>
            {post.title}
          </h1>

          <div className='flex items-center space-x-6 text-gray-600 dark:text-gray-300 animate-fadeInUp animation-delay-200'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm font-medium'>
                  {post.author.charAt(0)}
                </span>
              </div>
              <span className='font-medium'>{post.author}</span>
            </div>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Hero Image */}
        <div className='mb-8 animate-fadeInUp animation-delay-400'>
          <img
            src={post?.image}
            alt={post?.title}
            className='w-full h-auto rounded-lg shadow-lg'
          />
        </div>

        {/* Article Content */}
        <article className='prose prose-lg dark:prose-invert max-w-none animate-fadeInUp animation-delay-600'>
          <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700'>
            {post?.content
              .split('\n\n')
              .map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className='mb-6 text-gray-700 dark:text-gray-300 leading-relaxed'
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </article>

        {/* Tags */}
        <div className='mt-8 animate-fadeInUp animation-delay-800'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
            Tags
          </h3>
          <div className='flex flex-wrap gap-2'>
            {post?.tags.map((tag: string) => (
              <span
                key={tag}
                className='px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer'
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className='mt-12 p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-center animate-fadeInUp animation-delay-1200'>
          <h3 className='text-xl font-bold text-white mb-4'>
            Enjoyed this article?
          </h3>
          <p className='text-blue-100 mb-6'>
            Share it with your friends and colleagues
          </p>
          <div className='flex justify-center space-x-4'>
            <button className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all'>
              Share on Twitter
            </button>
            <button className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all'>
              Share on LinkedIn
            </button>
            <button className='bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all'>
              Copy Link
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-600 { animation-delay: 600ms; }
        .animation-delay-800 { animation-delay: 800ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .animation-delay-1200 { animation-delay: 1200ms; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogDetails;
