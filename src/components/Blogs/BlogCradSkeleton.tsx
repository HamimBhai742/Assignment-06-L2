const BlogCardSkeleton = () => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800 animate-pulse'>
      {/* Image Skeleton */}
      <div className='h-52 bg-gray-300 dark:bg-gray-700 relative'>
        <div className='absolute top-4 left-4 h-6 w-20 rounded-full bg-gray-400 dark:bg-gray-600'></div>
      </div>

      {/* Content */}
      <div className='p-6'>
        {/* Meta */}
        <div className='flex items-center justify-between mb-3'>
          <div className='h-3 w-24 rounded bg-gray-300 dark:bg-gray-700'></div>
          <div className='h-3 w-16 rounded bg-gray-300 dark:bg-gray-700'></div>
        </div>

        {/* Title */}
        <div className='space-y-2 mb-4'>
          <div className='h-5 w-full rounded bg-gray-300 dark:bg-gray-700'></div>
          <div className='h-5 w-4/5 rounded bg-gray-300 dark:bg-gray-700'></div>
        </div>

        {/* Excerpt */}
        <div className='space-y-2 mb-4'>
          <div className='h-3 w-full rounded bg-gray-200 dark:bg-gray-600'></div>
          <div className='h-3 w-11/12 rounded bg-gray-200 dark:bg-gray-600'></div>
          <div className='h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-600'></div>
        </div>

        {/* Tags */}
        <div className='flex gap-2'>
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className='h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-700'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
