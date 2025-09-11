import { Link } from 'react-router';

export default function CtaSection() {
  return (
    <section className='py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-6'>
          Ready to Transform Your Financial Life?
        </h2>
        <p className='text-xl text-blue-100 dark:text-gray-300 mb-8'>
          Join over 50 million users who trust PayWallet for their daily
          financial needs
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            to='/register'
            className='bg-white dark:bg-gray-700 text-blue-600 dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'
          >
            Get Started Free
          </Link>
          <Link
            to='/contact'
            className='border-2 border-white dark:border-gray-300 text-white dark:text-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-white dark:hover:bg-gray-200 hover:text-blue-600 dark:hover:text-gray-900 transition-colors'
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
