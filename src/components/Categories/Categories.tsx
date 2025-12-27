const Categories = () => {
  return (
    <section className='pb-8 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Service Categories
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Everything you need for digital payments
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {[
            {
              name: 'Send Money',
              icon: '💸',
              color: 'bg-blue-100 dark:bg-blue-900',
            },
            {
              name: 'Cash In/Out',
              icon: '🏧',
              color: 'bg-green-100 dark:bg-green-900',
            },
            {
              name: 'Bill Payment',
              icon: '📄',
              color: 'bg-purple-100 dark:bg-purple-900',
            },
            {
              name: 'Mobile Recharge',
              icon: '📱',
              color: 'bg-orange-100 dark:bg-orange-900',
            },
            {
              name: 'Online Shopping',
              icon: '🛒',
              color: 'bg-pink-100 dark:bg-pink-900',
            },
            {
              name: 'Utility Bills',
              icon: '💡',
              color: 'bg-yellow-100 dark:bg-yellow-900',
            },
            {
              name: 'Insurance',
              icon: '🛡️',
              color: 'bg-indigo-100 dark:bg-indigo-900',
            },
            {
              name: 'Education',
              icon: '🎓',
              color: 'bg-teal-100 dark:bg-teal-900',
            },
          ].map((category, index) => (
            <div
              key={index}
              className={`${category.color} p-6 rounded-lg text-center hover:scale-105 transition-transform duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='text-3xl mb-3'>{category.icon}</div>
              <h3 className='font-semibold text-gray-800 dark:text-gray-200'>
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
