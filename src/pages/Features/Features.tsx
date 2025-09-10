import { useState } from 'react';
import FeatureHeroSection from '../../components/FeaturesHeroSection/FeatureHeroSection';
import { allFeatures } from './featresData';

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Hero Section Component

  // Feature Categories
  const categories = [
    { id: 'all', name: 'All Features', icon: '🌟' },
    { id: 'transfer', name: 'Money Transfer', icon: '💸' },
    { id: 'payment', name: 'Payments', icon: '💳' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'utility', name: 'Utilities', icon: '⚡' },
  ];

  const filteredFeatures =
    activeCategory === 'all'
      ? allFeatures
      : allFeatures.filter((feature) => feature.category === activeCategory);

  return (
    <div className='min-h-screen'>
      <FeatureHeroSection />

      {/* Feature Categories */}
      <section className='py-12 bg-white dark:bg-gray-900 border-b dark:border-gray-700'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap justify-center gap-4'>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                <span className='text-lg'>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              {activeCategory === 'all'
                ? 'All Features'
                : categories.find((c) => c.id === activeCategory)?.name}
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>
              Discover powerful tools designed to make your financial life
              easier
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredFeatures.length > 0 ? (
              filteredFeatures.map((feature, index) => (
                <div
                  key={index}
                  className='group bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700'
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <span className='text-2xl'>{feature.icon}</span>
                  </div>

                  <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                    {feature.title}
                  </h3>

                  <p className='text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
                    {feature.description}
                  </p>

                  <div className='space-y-2'>
                    {feature.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className='flex items-center text-sm text-gray-500 dark:text-gray-400'
                      >
                        <div className='w-2 h-2 bg-green-500 rounded-full mr-3'></div>
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <div className='mt-6 pt-6 border-t border-gray-100 dark:border-gray-700'>
                    <button className='text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors flex items-center group'>
                      Learn More
                      <svg
                        className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center'>This features has comming soon......</h2>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className='py-20 bg-gradient-to-r from-blue-600 to-purple-600'>
        <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-6'>
            Ready to Experience These Features?
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Join millions of users who trust PayWallet for their daily financial
            needs
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors'>
              Download App
            </button>
            <button className='border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors'>
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
