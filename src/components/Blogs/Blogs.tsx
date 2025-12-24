import React from 'react';

const Blogs = () => {
  return (
    <section className='py-16 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Latest from Our Blog
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Stay informed with financial tips and PayWallet updates
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              title: '5 Tips for Safe Digital Payments',
              excerpt:
                'Learn how to protect yourself while making online transactions and keep your money secure.',
              date: 'Dec 20, 2025',
              category: 'Security',
              image: '🔐',
            },
            {
              title: 'How to Start Your Agent Business',
              excerpt:
                'Complete guide to becoming a PayWallet agent and earning steady income from commissions.',
              date: 'Dec 18, 2025',
              category: 'Business',
              image: '🤝',
            },
            {
              title: 'New Features: Bill Reminders',
              excerpt:
                'Never miss a payment again with our new automatic bill reminder feature. Set it up today!',
              date: 'Dec 15, 2025',
              category: 'Features',
              image: '🔔',
            },
          ].map((blog, index) => (
            <div
              key={index}
              className='bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-in-up'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className='p-6'>
                <div className='text-4xl mb-4'>{blog.image}</div>
                <div className='flex items-center mb-3'>
                  <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs font-semibold rounded-full'>
                    {blog.category}
                  </span>
                  <span className='text-gray-500 dark:text-gray-400 text-sm ml-3'>
                    {blog.date}
                  </span>
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  {blog.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 text-sm mb-4'>
                  {blog.excerpt}
                </p>
                <button className='text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline'>
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
