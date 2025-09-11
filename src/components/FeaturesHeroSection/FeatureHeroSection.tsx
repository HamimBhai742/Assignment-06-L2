
const FeatureHeroSection = () => {
  return (
    <section className='relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl'></div>
        <div className='absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl md:text-6xl font-bold text-white dark:text-gray-100 mb-6'>
          Powerful Features for
          <span className='block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent'>
            Digital Payments
          </span>
        </h1>
        <p className='text-xl text-blue-100 dark:text-gray-300 mb-12 max-w-3xl mx-auto'>
          Experience seamless, secure, and lightning-fast digital transactions
          with our comprehensive suite of financial tools
        </p>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto'>
          {[
            { number: '50M+', label: 'Active Users' },
            { number: '₹2B+', label: 'Daily Transactions' },
            { number: '99.9%', label: 'Uptime' },
            { number: '24/7', label: 'Support' },
          ].map((stat, index) => (
            <div key={index} className='text-center'>
              <div className='text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-2'>
                {stat.number}
              </div>
              <div className='text-blue-200 dark:text-gray-400 text-sm'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHeroSection;
