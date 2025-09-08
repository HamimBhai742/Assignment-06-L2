import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white">
         {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
                  💳
                </span>
                PayWallet
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bangladesh's most trusted digital wallet. Send money, pay bills, and manage your finances securely with bank-level protection.
              </p>
            </div>

            {/* App Download */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-300">Download Our App</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <button className="bg-black border border-gray-600 rounded-lg px-3 py-2 flex items-center space-x-2 hover:border-gray-500 transition-colors group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </button>

                <button className="bg-black border border-gray-600 rounded-lg px-3 py-2 flex items-center space-x-2 hover:border-gray-500 transition-colors group">
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Get it on</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Features', href: '/features' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
              Services
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Send Money', icon: '💸' },
                { name: 'Cash Out', icon: '🏧' },
                { name: 'Cash In', icon: '🏪' },
                { name: 'Withdraw', icon: '💰' },
                { name: 'Deposit', icon: '🏧' }
              ].map((service) => (
                <li key={service.name}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                    <span className="mr-3 group-hover:scale-110 transition-transform">{service.icon}</span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center">
              <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
              Support
            </h4>
            <div className="space-y-4">
              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <span className="mr-2">📞</span>
                  Customer Care
                </p>
                <p className="text-gray-400 text-sm">16247 (24/7 Free)</p>
                <p className="text-gray-400 text-sm">support@paywallet.com</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-300 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  {[
                    { name: 'Facebook', icon: '📘', color: 'hover:bg-blue-600' },
                    { name: 'Twitter', icon: '🐦', color: 'hover:bg-sky-500' },
                    { name: 'LinkedIn', icon: '💼', color: 'hover:bg-blue-700' },
                    { name: 'YouTube', icon: '📺', color: 'hover:bg-red-600' }
                  ].map((social) => (
                    <button
                      key={social.name}
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                      title={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                  <span className="mr-2">📍</span>
                  Office Address
                </p>
                <p className="text-gray-400 text-sm">
                  PayWallet Tower, Level 10<br />
                  Gulshan Avenue, Dhaka-1212<br />
                  Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security & Partners Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">

            {/* Security Badges */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-green-400 text-xl">🔒</span>
                <div>
                  <div className="text-sm font-medium text-white">SSL Secured</div>
                  <div className="text-xs text-gray-400">256-bit Encryption</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-blue-400 text-xl">🏦</span>
                <div>
                  <div className="text-sm font-medium text-white">BB Licensed</div>
                  <div className="text-xs text-gray-400">Bangladesh Bank</div>
                </div>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-yellow-400 text-xl">🛡️</span>
                <div>
                  <div className="text-sm font-medium text-white">PCI DSS</div>
                  <div className="text-xs text-gray-400">Compliant</div>
                </div>
              </div>
            </div>

            {/* Partner Banks */}
            <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <span className="text-sm text-gray-400 font-medium">Powered by:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'DBBL', color: 'bg-blue-600' },
                  { name: 'BRAC', color: 'bg-green-600' },
                  { name: 'City', color: 'bg-purple-600' },
                  { name: 'EBL', color: 'bg-orange-600' }
                ].map((bank) => (
                  <div key={bank.name} className={`${bank.color} px-3 py-1 rounded-full text-xs text-white font-medium`}>
                    {bank.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} PayWallet Ltd. All rights reserved. | Licensed by Bangladesh Bank
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Privacy Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Terms of Service</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Cookie Policy</a>
              <span className="text-gray-600">•</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline">Compliance</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;