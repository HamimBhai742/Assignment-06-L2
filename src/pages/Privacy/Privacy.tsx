const Privacy = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-gray-800 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 dark:text-purple-200 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <div className="mt-6 text-sm text-purple-200 dark:text-purple-300">
              Last updated: December 23, 2025
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="prose prose-lg dark:prose-invert max-w-none">

          {/* Information We Collect */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              1. Information We Collect
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Personal Information
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Name, email address, phone number</li>
                  <li>National ID or passport information</li>
                  <li>Bank account details and financial information</li>
                  <li>Transaction history and payment data</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Technical Information
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Device information and IP address</li>
                  <li>Browser type and operating system</li>
                  <li>Usage patterns and app interactions</li>
                  <li>Location data (with your consent)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              2. How We Use Your Information
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Service Provision
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  <li>Process transactions and payments</li>
                  <li>Verify your identity</li>
                  <li>Provide customer support</li>
                  <li>Send service notifications</li>
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Security & Compliance
                </h3>
                <ul className="list-disc pl-4 space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                  <li>Prevent fraud and money laundering</li>
                  <li>Comply with legal requirements</li>
                  <li>Monitor suspicious activities</li>
                  <li>Maintain system security</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              3. Information Sharing
            </h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-6 mb-6">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>We never sell your personal information.</strong> We only share data in specific circumstances outlined below.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">With Your Consent</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">When you explicitly authorize us to share information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Legal Requirements</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">To comply with laws, regulations, or court orders</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200">Service Providers</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">With trusted partners who help us operate our services</p>
                </div>
              </div>
            </div>
          </section>

          {/* Data Security */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              4. Data Security
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl mb-2">🔒</div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">SSL Encryption</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">256-bit encryption for all data transmission</p>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl mb-2">🏦</div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Bank-Level Security</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Same security standards as major banks</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl mb-2">🛡️</div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">PCI Compliant</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Certified payment card industry standards</p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              5. Your Rights
            </h2>
            <div className="space-y-4">
              {[
                { title: 'Access', desc: 'Request a copy of your personal data' },
                { title: 'Correction', desc: 'Update or correct inaccurate information' },
                { title: 'Deletion', desc: 'Request deletion of your data (subject to legal requirements)' },
                { title: 'Portability', desc: 'Transfer your data to another service provider' },
                { title: 'Objection', desc: 'Object to certain types of data processing' }
              ].map((right, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{right.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Information */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              6. Contact Us
            </h2>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you have questions about this Privacy Policy or want to exercise your rights, contact us:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Email</h4>
                  <p className="text-purple-600 dark:text-purple-400">privacy@paywallet.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Phone</h4>
                  <p className="text-purple-600 dark:text-purple-400">16247 (24/7 Free)</p>
                </div>
                <div className="sm:col-span-2">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Address</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    PayWallet Tower, Level 10<br />
                    Gulshan Avenue, Dhaka-1212, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              7. Policy Updates
            </h2>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">
                We may update this Privacy Policy periodically. We'll notify you of significant changes via email or app notification.
                Your continued use of PayWallet after changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;