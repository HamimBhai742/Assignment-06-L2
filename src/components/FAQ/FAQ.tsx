const FAQ = () => {
  return (
    <section className='py-16 bg-white dark:bg-gray-900'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Frequently Asked Questions
          </h2>
        </div>
        <div className='space-y-4'>
          {[
            {
              q: 'How do I create a PayWallet account?',
              a: 'Simply download the app, enter your mobile number, and complete the verification process. It takes less than 5 minutes!',
            },
            {
              q: 'What are the transaction fees?',
              a: 'Send money: 1% + ৳5, Cash out: 1.5% + ৳10, Bill payments: ৳5 flat fee.',
            },
            {
              q: 'Is PayWallet secure?',
              a: 'Yes! We use bank-level 256-bit encryption, are PCI DSS certified, and licensed by Bangladesh Bank.',
            },
            {
              q: 'What are the transaction limits?',
              a: 'Daily limit: ৳25,000, Monthly limit: ৳2,00,000, Maximum wallet balance: ৳50,000.',
            },
          ].map((faq, index) => (
            <details
              key={index}
              className='bg-gray-50 dark:bg-gray-800 rounded-lg group animate-fade-in-up'
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <summary className='p-6 cursor-pointer flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                  {faq.q}
                </h3>
                <span className='text-gray-500 dark:text-gray-400 group-open:rotate-180 transition-transform duration-300'>
                  ▼
                </span>
              </summary>
              <div className='px-6 pb-6'>
                <p className='text-gray-600 dark:text-gray-300'>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
