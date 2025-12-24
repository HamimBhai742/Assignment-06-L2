const Compliance = () => {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-700 dark:to-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
          <div className='text-center animate-fade-in'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-up'>
              Compliance & Regulations
            </h1>
            <p className='text-lg sm:text-xl text-green-100 max-w-3xl mx-auto animate-slide-up delay-100'>
              PayWallet operates under strict regulatory compliance to ensure
              secure and legal financial services.
            </p>
            <div className='mt-6 text-sm text-green-200 animate-slide-up delay-200'>
              Last Updated: December 23, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        {/* Regulatory Licenses */}
        <section className='mb-12 animate-fade-in-up'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
            1. Regulatory Licenses
          </h2>
          <div className='grid gap-6 md:grid-cols-2'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-2xl'>🏦</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    Bangladesh Bank
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Mobile Financial Services License
                  </p>
                </div>
              </div>
              <p className='text-gray-700 dark:text-gray-300 text-sm'>
                Licensed under Bangladesh Bank's MFS regulations with license
                number MFS-2024-001.
              </p>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300'>
              <div className='flex items-center mb-4'>
                <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4'>
                  <span className='text-2xl'>🛡️</span>
                </div>
                <div>
                  <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    PCI DSS
                  </h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400'>
                    Payment Card Industry Compliance
                  </p>
                </div>
              </div>
              <p className='text-gray-700 dark:text-gray-300 text-sm'>
                Level 1 PCI DSS certified for secure payment processing and data
                protection.
              </p>
            </div>
          </div>
        </section>

        {/* AML/CFT Compliance */}
        <section className='mb-12 animate-fade-in-up delay-100'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
            2. Anti-Money Laundering (AML) & Counter Financing of Terrorism
            (CFT)
          </h2>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6'>
            <div className='grid gap-6 md:grid-cols-3'>
              <div className='text-center hover:scale-105 transition-transform duration-300'>
                <div className='w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-3xl'>🔍</span>
                </div>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  Transaction Monitoring
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Real-time monitoring of all transactions for suspicious
                  activities
                </p>
              </div>
              <div className='text-center hover:scale-105 transition-transform duration-300'>
                <div className='w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-3xl'>📋</span>
                </div>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  KYC Verification
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Mandatory Know Your Customer verification for all users
                </p>
              </div>
              <div className='text-center hover:scale-105 transition-transform duration-300'>
                <div className='w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <span className='text-3xl'>📊</span>
                </div>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  Reporting
                </h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Regular compliance reports to Bangladesh Financial
                  Intelligence Unit
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Transaction Limits */}
        <section className='mb-12 animate-fade-in-up delay-200'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
            3. Transaction Limits & Controls
          </h2>
          <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg'>
            <p className='text-gray-700 dark:text-gray-300 mb-6'>
              Transaction limits are set in accordance with Bangladesh Bank
              regulations:
            </p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              <div className='bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition-transform duration-300'>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  Daily Limit
                </h4>
                <p className='text-2xl font-bold text-blue-600 dark:text-blue-400'>
                  ৳25,000
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Per day per user
                </p>
              </div>
              <div className='bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition-transform duration-300'>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  Monthly Limit
                </h4>
                <p className='text-2xl font-bold text-green-600 dark:text-green-400'>
                  ৳2,00,000
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Per month per user
                </p>
              </div>
              <div className='bg-white dark:bg-gray-800 p-4 rounded-lg text-center hover:scale-105 transition-transform duration-300'>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>
                  Balance Limit
                </h4>
                <p className='text-2xl font-bold text-purple-600 dark:text-purple-400'>
                  ৳50,000
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Maximum wallet balance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Compliance */}
        <section className='animate-fade-in-up delay-300'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6'>
            4. Compliance Contact
          </h2>
          <div className='bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-lg'>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              For compliance-related inquiries or to report violations:
            </p>
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              <div className='text-center'>
                <div className='text-2xl mb-2'>📧</div>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 text-sm'>
                  Email
                </h4>
                <p className='text-green-600 dark:text-green-400 text-sm'>
                  compliance@paywallet.com
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>📞</div>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 text-sm'>
                  Hotline
                </h4>
                <p className='text-green-600 dark:text-green-400 text-sm'>
                  16247 (Ext: 101)
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>⚠️</div>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 text-sm'>
                  Report Fraud
                </h4>
                <p className='text-red-600 dark:text-red-400 text-sm'>
                  fraud@paywallet.com
                </p>
              </div>
              <div className='text-center'>
                <div className='text-2xl mb-2'>🏢</div>
                <h4 className='font-semibold text-gray-800 dark:text-gray-200 text-sm'>
                  Office
                </h4>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>
                  Compliance Dept.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Compliance;
