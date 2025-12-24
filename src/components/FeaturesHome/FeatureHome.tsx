import { Link } from 'react-router';
import { featresData } from './FeaturesData';

export default function FeatureHome() {
  return (
    <section className='py-16 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Why Choose PayWallet?
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Experience the future of digital payments with our comprehensive
            suite of financial tools
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {featresData.map((feature, index) => (
            <div
              key={index}
              className='group bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <span className='text-2xl'>{feature.icon}</span>
              </div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Link
            to='/features'
            className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105'
          >
            Explore All Features
            <svg
              className='w-5 h-5 ml-2'
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
          </Link>
        </div>
      </div>
    </section>
  );
}
