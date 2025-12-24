const Newaletter = () => {
  return (
    <section className='py-16'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='animate-fade-in-up bg-blue-600 py-16 dark:bg-gray-800 rounded-lg shadow-lg'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
            Stay Updated
          </h2>
          <p className='text-xl text-blue-100 mb-8'>
            Subscribe to get the latest news, offers, and updates from PayWallet
          </p>
          <div className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
            <input
              type='email'
              placeholder='Enter your email'
              className='flex-1 bg-white text-black px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300'
            />
            <button className='px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-400 hover:cursor-pointer transition-colors duration-300'>
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newaletter;
