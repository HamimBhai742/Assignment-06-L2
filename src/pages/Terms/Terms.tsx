const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-blue-600 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 animate-slide-up">
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto animate-slide-up delay-100">
              Please read these terms carefully before using PayWallet services.
            </p>
            <div className="mt-6 text-sm text-blue-200 animate-slide-up delay-200">
              Effective Date: December 23, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Acceptance */}
        <section className="mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            1. Acceptance of Terms
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing or using PayWallet services, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services. These terms apply to all users,
              including agents and merchants.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mb-12 animate-fade-in-up delay-100">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            2. Our Services
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: 'Money Transfer', desc: 'Send and receive money instantly', icon: '💸' },
              { title: 'Cash In/Out', desc: 'Deposit and withdraw funds through agents', icon: '🏧' },
              { title: 'Bill Payments', desc: 'Pay utility bills and services', icon: '📄' },
              { title: 'Mobile Recharge', desc: 'Top up mobile balance', icon: '📱' }
            ].map((service, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="mb-12 animate-fade-in-up delay-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            3. User Responsibilities
          </h2>
          <div className="space-y-4">
            {[
              'Provide accurate and complete information during registration',
              'Keep your account credentials secure and confidential',
              'Use services only for lawful purposes',
              'Comply with all applicable laws and regulations',
              'Report suspicious activities immediately',
              'Maintain sufficient balance for transactions'
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:translate-x-2">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <p className="text-gray-700 dark:text-gray-300">{item}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prohibited Activities */}
        <section className="mb-12 animate-fade-in-up delay-300">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            4. Prohibited Activities
          </h2>
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-4">You may not:</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                'Use services for illegal activities',
                'Create multiple accounts',
                'Share account with others',
                'Attempt to hack or breach security',
                'Engage in money laundering',
                'Violate any laws or regulations'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-red-500 text-lg">⚠️</span>
                  <span className="text-red-700 dark:text-red-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Fees and Charges */}
        <section className="mb-12 animate-fade-in-up delay-400">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            5. Fees and Charges
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                PayWallet charges fees for certain services. All fees are clearly displayed before you complete any transaction.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl mb-2">💰</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Send Money</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1% + ৳5</p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl mb-2">🏧</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Cash Out</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">1.5% + ৳10</p>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:scale-105 transition-transform duration-300">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Bill Payment</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">৳5 flat</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12 animate-fade-in-up delay-500">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            6. Limitation of Liability
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              PayWallet's liability is limited to the amount of the specific transaction in question.
              We are not liable for indirect, incidental, or consequential damages. Our maximum liability
              shall not exceed ৳10,000 for any single incident.
            </p>
          </div>
        </section>

        {/* Termination */}
        <section className="mb-12 animate-fade-in-up delay-600">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            7. Account Termination
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">By You</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                You may close your account at any time by contacting customer support.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Withdraw remaining balance</li>
                <li>• Complete pending transactions</li>
                <li>• Contact support for closure</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">By PayWallet</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                We may suspend or terminate accounts for violations of these terms.
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Immediate for illegal activities</li>
                <li>• 30-day notice for other violations</li>
                <li>• Refund remaining balance</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="animate-fade-in-up delay-700">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            8. Contact Information
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Questions about these Terms of Service? Contact us:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl mb-2">📧</div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Email</h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">legal@paywallet.com</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📞</div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Phone</h4>
                <p className="text-blue-600 dark:text-blue-400 text-sm">16247</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📍</div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Address</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
