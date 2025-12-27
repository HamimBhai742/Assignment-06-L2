const BlogDetailsSkeleton = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 animate-pulse'>
      {/* Header Skeleton */}
      <div className='bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          {/* Back link */}
          <div className='h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6' />

          {/* Category */}
          <div className='h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full mb-6' />

          {/* Title */}
          <div className='space-y-3 mb-4'>
            <div className='h-8 w-3/4 bg-gray-300 dark:bg-gray-700 rounded' />
            <div className='h-8 w-1/2 bg-gray-300 dark:bg-gray-700 rounded' />
          </div>

          {/* Meta */}
          <div className='flex items-center space-x-6'>
            <div className='flex items-center space-x-2'>
              <div className='w-8 h-8 rounded-full bg-gray-400 dark:bg-gray-600' />
              <div className='h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded' />
            </div>
            <div className='h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded' />
            <div className='h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Hero Image */}
        <div className='h-[380px] w-full bg-gray-300 dark:bg-gray-700 rounded-lg shadow-lg mb-8' />

        {/* Article Content */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 space-y-4'>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className='h-4 w-full bg-gray-300 dark:bg-gray-700 rounded'
            />
          ))}
          <div className='h-4 w-4/5 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-4 w-3/5 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>

        {/* Tags */}
        <div className='mt-8'>
          <div className='h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-4' />
          <div className='flex flex-wrap gap-2'>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className='h-7 w-20 bg-gray-200 dark:bg-gray-700 rounded-full'
              />
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className='mt-12 p-6 rounded-2xl bg-gray-300 dark:bg-gray-700'>
          <div className='h-6 w-56 mx-auto bg-gray-400 dark:bg-gray-600 rounded mb-4' />
          <div className='h-4 w-72 mx-auto bg-gray-400 dark:bg-gray-600 rounded mb-6' />
          <div className='flex justify-center space-x-4'>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className='h-10 w-32 bg-gray-400 dark:bg-gray-600 rounded-lg'
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailsSkeleton;
