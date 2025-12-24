const Highlights = () => {
  return (
    <section className='py-16 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Why Choose PayWallet?
          </h2>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {[
            {
              title: 'Bank-Level Security',
              desc: '256-bit encryption & fraud protection',
              icon: '🔒',
            },
            {
              title: '24/7 Support',
              desc: 'Round-the-clock customer assistance',
              icon: '🕐',
            },
            {
              title: 'Instant Transfers',
              desc: 'Send money in seconds, not minutes',
              icon: '⚡',
            },
            {
              title: 'Low Fees',
              desc: 'Competitive rates for all transactions',
              icon: '💰',
            },
            {
              title: 'Wide Network',
              desc: '50,000+ agent points nationwide',
              icon: '🌐',
            },
            {
              title: 'Easy to Use',
              desc: 'Simple interface for everyone',
              icon: '📱',
            },
          ].map((highlight, index) => (
            <div
              key={index}
              className='text-center p-6 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 animate-fade-in-up'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='text-4xl mb-4'>{highlight.icon}</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                {highlight.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300'>
                {highlight.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
