const Statistics = () => {
  return (
    <section>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        <div className='bg-blue-600 dark:bg-gray-800 py-16 rounded-lg shadow-lg'>
          <div className='text-center mb-12 animate-fade-in-up'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              PayWallet by Numbers
            </h2>
            <p className='text-xl text-blue-100'>
              Trusted by millions across Bangladesh
            </p>
          </div>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {[
              { number: '5M+', label: 'Active Users' },
              { number: '50K+', label: 'Agent Points' },
              { number: '৳100B+', label: 'Transactions' },
              { number: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <div
                key={index}
                className='text-center animate-fade-in-up'
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='text-4xl md:text-5xl font-bold text-white mb-2'>
                  {stat.number}
                </div>
                <div className='text-blue-100'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
