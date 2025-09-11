/* eslint-disable @typescript-eslint/no-explicit-any */

const FqaHeroSection = ({searchTerm, setSearchTerm}:any) => {
  return (
    <section className='relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-white dark:text-gray-100 mb-6'>
          Frequently Asked
          <span className='block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
            Questions
          </span>
        </h1>
        <p className='text-xl text-blue-100 dark:text-gray-300 mb-12 max-w-2xl mx-auto'>
          Find quick answers to common questions about PayWallet services,
          security, and features
        </p>
     
        {/* Search Bar */}
        <div className='relative max-w-2xl mx-auto mb-8'>
          <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
            <svg
              className='h-5 w-5 text-gray-400 dark:text-gray-500'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              />
            </svg>
          </div>
          <input
            type='text'
            placeholder='Search for answers...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-12 pr-4 py-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-md border border-white/20 dark:border-gray-600/50 rounded-2xl text-white dark:text-gray-200 placeholder-white/70 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 dark:focus:ring-gray-500/50 focus:border-transparent'
          />
        </div>

        {/* Quick Stats */}
        <div className='grid grid-cols-3 gap-6 max-w-lg mx-auto'>
          <div className='text-center'>
            <div className='text-2xl font-bold text-white dark:text-gray-100'>24/7</div>
            <div className='text-blue-200 dark:text-gray-400 text-sm'>Support</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-white dark:text-gray-100'>15+</div>
            <div className='text-blue-200 dark:text-gray-400 text-sm'>Categories</div>
          </div>
          <div className='text-center'>
            <div className='text-2xl font-bold text-white dark:text-gray-100'>100+</div>
            <div className='text-blue-200 dark:text-gray-400 text-sm'>Answers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FqaHeroSection;
