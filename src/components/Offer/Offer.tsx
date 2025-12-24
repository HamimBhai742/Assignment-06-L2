const Offer = () => {
  return (
    <section className='py-16 bg-yellow-50 dark:bg-yellow-900/10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Special Offers
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Limited time deals and promotions
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-6'>
          {[
            {
              title: 'New User Bonus',
              desc: 'Get ৳50 cashback on your first transaction',
              code: 'WELCOME50',
              color: 'bg-green-500',
            },
            {
              title: 'Refer & Earn',
              desc: 'Earn ৳25 for each successful referral',
              code: 'REFER25',
              color: 'bg-blue-500',
            },
            {
              title: 'Bill Payment Offer',
              desc: '5% cashback on utility bill payments',
              code: 'BILL5',
              color: 'bg-purple-500',
            },
          ].map((offer, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border-l-4 border-yellow-400 hover:shadow-md transition-all duration-300 animate-fade-in-up'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-block px-3 py-1 ${offer.color} text-white text-xs font-bold rounded-full mb-3`}
              >
                {offer.code}
              </div>
              <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-2'>
                {offer.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 text-sm'>
                {offer.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offer;
