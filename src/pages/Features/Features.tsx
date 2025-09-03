import { useState } from 'react';

const Features = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  // Hero Section Component
  const HeroSection = () => (
    <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Powerful Features for
          <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Digital Payments
          </span>
        </h1>
        <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
          Experience seamless, secure, and lightning-fast digital transactions with our comprehensive suite of financial tools
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { number: '50M+', label: 'Active Users' },
            { number: '₹2B+', label: 'Daily Transactions' },
            { number: '99.9%', label: 'Uptime' },
            { number: '24/7', label: 'Support' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-blue-200 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Feature Categories
  const categories = [
    { id: 'all', name: 'All Features', icon: '🌟' },
    { id: 'transfer', name: 'Money Transfer', icon: '💸' },
    { id: 'payment', name: 'Payments', icon: '💳' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'utility', name: 'Utilities', icon: '⚡' }
  ];

  // All Features Data
  const allFeatures = [
    // Money Transfer Features
    {
      category: 'transfer',
      title: 'Instant Money Transfer',
      description: 'Send money to anyone instantly using mobile number or QR code',
      icon: '⚡',
      color: 'from-blue-500 to-cyan-500',
      benefits: ['Instant transfer', 'No hidden fees', '24/7 availability']
    },
    {
      category: 'transfer',
      title: 'International Remittance',
      description: 'Send money abroad with competitive exchange rates',
      icon: '🌍',
      color: 'from-green-500 to-emerald-500',
      benefits: ['Global reach', 'Best rates', 'Secure transfer']
    },
    {
      category: 'transfer',
      title: 'Bulk Transfers',
      description: 'Send money to multiple recipients at once for businesses',
      icon: '📊',
      color: 'from-purple-500 to-violet-500',
      benefits: ['Bulk processing', 'CSV upload', 'Business tools']
    },
    
    // Payment Features
    {
      category: 'payment',
      title: 'QR Code Payments',
      description: 'Pay at any merchant by scanning QR codes instantly',
      icon: '📱',
      color: 'from-orange-500 to-red-500',
      benefits: ['Contactless', 'Instant', 'Secure']
    },
    {
      category: 'payment',
      title: 'Bill Payments',
      description: 'Pay utility bills, mobile recharge, and subscriptions',
      icon: '🧾',
      color: 'from-teal-500 to-cyan-500',
      benefits: ['Auto-pay', 'Reminders', 'Cashback']
    },
    {
      category: 'payment',
      title: 'Online Shopping',
      description: 'Shop online with one-click payments and offers',
      icon: '🛒',
      color: 'from-pink-500 to-rose-500',
      benefits: ['One-click pay', 'Exclusive offers', 'Buyer protection']
    },
    
    // Security Features
    {
      category: 'security',
      title: 'Biometric Security',
      description: 'Secure your account with fingerprint and face recognition',
      icon: '👆',
      color: 'from-indigo-500 to-purple-500',
      benefits: ['Fingerprint', 'Face ID', 'Voice recognition']
    },
    {
      category: 'security',
      title: 'Transaction Limits',
      description: 'Set daily and monthly transaction limits for safety',
      icon: '🛡️',
      color: 'from-gray-600 to-gray-800',
      benefits: ['Custom limits', 'Real-time alerts', 'Fraud protection']
    },
    {
      category: 'security',
      title: 'Two-Factor Authentication',
      description: 'Extra layer of security with SMS and app-based 2FA',
      icon: '🔐',
      color: 'from-yellow-500 to-orange-500',
      benefits: ['SMS OTP', 'App authenticator', 'Email verification']
    },
    
    // Utility Features
    {
      category: 'utility',
      title: 'Expense Tracking',
      description: 'Track your spending with detailed analytics and insights',
      icon: '📈',
      color: 'from-emerald-500 to-teal-500',
      benefits: ['Smart categorization', 'Monthly reports', 'Budget alerts']
    },
    {
      category: 'utility',
      title: 'Savings Goals',
      description: 'Set and achieve your financial goals with automated savings',
      icon: '🎯',
      color: 'from-blue-600 to-indigo-600',
      benefits: ['Auto-save', 'Goal tracking', 'Interest earning']
    },
    {
      category: 'utility',
      title: 'Investment Options',
      description: 'Invest in mutual funds, FDs, and other financial instruments',
      icon: '📊',
      color: 'from-green-600 to-emerald-600',
      benefits: ['Mutual funds', 'Fixed deposits', 'SIP options']
    }
  ];

  const filteredFeatures = activeCategory === 'all' 
    ? allFeatures 
    : allFeatures.filter(feature => feature.category === activeCategory);

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Feature Categories */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {activeCategory === 'all' ? 'All Features' : categories.find(c => c.id === activeCategory)?.name}
            </h2>
            <p className="text-xl text-gray-600">
              Discover powerful tools designed to make your financial life easier
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFeatures.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center group">
                    Learn More
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join millions of users who trust PayWallet for their daily financial needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Download App
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
