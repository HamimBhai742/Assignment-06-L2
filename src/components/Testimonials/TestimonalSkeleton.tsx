const TestimonialsSectionSkeleton = () => {
  return (
    <section className='py-24 relative overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900' />

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse'>
        {/* Header Skeleton */}
        <div className='text-center mb-20'>
          <div className='w-16 h-16 mx-auto mb-8 rounded-2xl bg-gray-300/50 dark:bg-gray-700/40' />
          <div className='h-10 w-96 mx-auto mb-6 rounded bg-gray-300/60 dark:bg-gray-700/50' />
          <div className='h-5 w-[520px] max-w-full mx-auto rounded bg-gray-200/60 dark:bg-gray-600/50' />
        </div>

        {/* Testimonials Cards Skeleton */}
        <div className='relative max-w-6xl mx-auto mb-20'>
          <div className='flex items-center justify-center h-[520px] relative'>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`absolute ${
                  i === 1
                    ? 'z-30 scale-100'
                    : 'z-10 scale-90 blur-sm opacity-60'
                }`}
                style={{
                  transform:
                    i === 0
                      ? 'translateX(-75%)'
                      : i === 2
                      ? 'translateX(75%)'
                      : 'translateX(0)',
                }}
              >
                <div className='bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl w-[420px] h-[450px] flex flex-col'>
                  {/* Header */}
                  <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center space-x-4'>
                      <div className='w-16 h-16 rounded-2xl bg-gray-300/60 dark:bg-gray-700/60' />
                      <div>
                        <div className='h-4 w-32 mb-2 rounded bg-gray-300/60 dark:bg-gray-700/60' />
                        <div className='h-3 w-24 rounded bg-gray-200/60 dark:bg-gray-600/60' />
                      </div>
                    </div>

                    <div className='flex space-x-1'>
                      {[1, 2, 3, 4, 5].map((_, j) => (
                        <div
                          key={j}
                          className='w-5 h-5 rounded-full bg-gray-300/60 dark:bg-gray-600/60'
                        />
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div className='space-y-3 flex-1 flex flex-col justify-center'>
                    <div className='h-4 w-full rounded bg-gray-300/50 dark:bg-gray-700/50' />
                    <div className='h-4 w-[90%] rounded bg-gray-300/50 dark:bg-gray-700/50' />
                    <div className='h-4 w-[80%] rounded bg-gray-300/50 dark:bg-gray-700/50' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Skeleton */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className='text-center'>
              <div className='h-10 w-24 mx-auto mb-3 rounded bg-gray-300/60 dark:bg-gray-700/60' />
              <div className='h-4 w-32 mx-auto rounded bg-gray-200/60 dark:bg-gray-600/60' />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionSkeleton;