import { useState } from 'react';
import FqaHeroSection from '../../components/FqaHeroSection/FqaHeroSection';
import { faqData } from './fqaData';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Filter FAQs based on category and search
  const filteredFAQs = faqData.filter((faq) => {
    const matchesCategory =
      activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <div className='min-h-screen'>
      <FqaHeroSection searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className='py-16 bg-white dark:bg-gray-900'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
              All Questions
            </h2>
            <p className='text-gray-600 dark:text-gray-300'>
              {filteredFAQs.length} question{' '}
              {filteredFAQs.length > 1 ? 'founds' : 'found'}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          <div className='space-y-4'>
            {filteredFAQs.map((faq, index) => (
              <div
                key={faq.id}
                className='border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden'
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                  className='w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
                >
                  <div className='flex items-center space-x-4'>
                    <span className='text-blue-600 dark:text-blue-400 font-semibold'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className='font-semibold text-gray-900 dark:text-white'>
                      {faq.question}
                    </h3>
                    {faq.popular && (
                      <span className='bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs px-2 py-1 rounded-full'>
                        Popular
                      </span>
                    )}
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${
                      openFAQ === faq.id ? 'rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </button>

                {openFAQ === faq.id && (
                  <div className='px-6 pb-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'>
                    <div className='pt-4'>
                      <p className='text-gray-700 dark:text-gray-300 leading-relaxed'>
                        {faq.answer}
                      </p>
                      <div className='mt-4 flex items-center space-x-4 text-sm'>
                        <button className='text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center space-x-1'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                            />
                          </svg>
                          <span>Helpful</span>
                        </button>
                        <button className='text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center space-x-1'>
                          <svg
                            className='w-4 h-4'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M7 13l3 3 7-7'
                            />
                          </svg>
                          <span>Not helpful</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>🔍</div>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                No results found
              </h3>
              <p className='text-gray-600 dark:text-gray-300 mb-6'>
                Try adjusting your search terms or browse different categories
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                }}
                className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors'
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
