import { Link } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='bg-gray-900 text-white'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div className='lg:col-span-1'>
            <div className='mb-6'>
              <h3 className='text-2xl font-bold text-white mb-4 flex items-center'>
                <span className='bg-gradient-to-r from-blue-400 to-purple-500 w-8 h-8 rounded-lg flex items-center justify-center mr-3'>
                  💳
                </span>
                PayWallet
              </h3>
              <p className='text-gray-400 text-sm leading-relaxed'>
                Bangladesh's most trusted digital wallet. Send money, pay bills,
                and manage your finances securely with bank-level protection.
              </p>
            </div>

            {/* App Download */}
            <div className='space-y-3'>
              <p className='text-sm font-medium text-gray-300'>
                Download Our App
              </p>
              <div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3'>
                <button className='bg-black border border-gray-600 rounded-lg px-3 py-2 flex items-center space-x-2 hover:border-gray-500 transition-colors group'>
                  <svg
                    className='w-5 h-5 group-hover:scale-110 transition-transform'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z' />
                  </svg>
                  <div className='text-left'>
                    <div className='text-xs text-gray-400'>Download on the</div>
                    <div className='text-sm font-medium'>App Store</div>
                  </div>
                </button>

                <button className='bg-black border border-gray-600 rounded-lg px-3 py-2 flex items-center space-x-2 hover:border-gray-500 transition-colors group'>
                  <svg
                    className='w-5 h-5 group-hover:scale-110 transition-transform'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                  >
                    <path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
                  </svg>
                  <div className='text-left'>
                    <div className='text-xs text-gray-400'>Get it on</div>
                    <div className='text-sm font-medium'>Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6 flex items-center'>
              <span className='w-2 h-2 bg-blue-400 rounded-full mr-3'></span>
              Quick Links
            </h4>
            <ul className='space-y-3'>
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Features', href: '/features' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className='text-gray-400 hover:text-white transition-colors text-sm flex items-center group'
                  >
                    <span className='w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors'></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6 flex items-center'>
              <span className='w-2 h-2 bg-green-400 rounded-full mr-3'></span>
              Services
            </h4>
            <ul className='space-y-3'>
              {[
                { name: 'Send Money', icon: '💸' },
                { name: 'Cash Out', icon: '🏧' },
                { name: 'Cash In', icon: '🏪' },
                { name: 'Withdraw', icon: '💰' },
                { name: 'Deposit', icon: '🏧' },
              ].map((service) => (
                <li key={service.name}>
                  <a
                    href='#'
                    className='text-gray-400 hover:text-white transition-colors text-sm flex items-center group'
                  >
                    <span className='mr-3 group-hover:scale-110 transition-transform'>
                      {service.icon}
                    </span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className='text-lg font-semibold text-white mb-6 flex items-center'>
              <span className='w-2 h-2 bg-purple-400 rounded-full mr-3'></span>
              Support
            </h4>
            <div className='space-y-4'>
              <div>
                <p className='text-sm font-medium text-gray-300 mb-3'>
                  Follow Us
                </p>
                <div className='flex space-x-3'>
                  {[
                    {
                      name: 'Facebook',
                      color: 'hover:bg-blue-600',
                      href: 'https://facebook.com/hamimdev742',
                      icon: (
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                        </svg>
                      ),
                    },
                    {
                      name: 'Twitter',
                      color: 'hover:bg-sky-500',
                      href: 'https://twitter.com/hamim742',
                      icon: (
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
                        </svg>
                      ),
                    },
                    {
                      name: 'LinkedIn',
                      color: 'hover:bg-blue-700',
                      href: 'https://linkedin.com/company/md-hamim42',
                      icon: (
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                        </svg>
                      ),
                    },
                    {
                      name: 'Instagram',
                      color: 'hover:bg-purple-600',
                      href: 'https://instagram.com/hamim_742',
                      icon: (
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path d='M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.718.302 4.019.57a5.962 5.962 0 00-2.153 1.4A5.962 5.962 0 00.434 4.123C.166 4.822-.009 5.63-.064 6.86-.12 8.093-.136 8.5-.136 12.121s.016 4.028.072 5.261c.055 1.23.23 2.038.498 2.737a5.962 5.962 0 001.4 2.153 5.962 5.962 0 002.153 1.4c.699.268 1.507.443 2.737.498 1.233.056 1.64.072 5.261.072s4.028-.016 5.261-.072c1.23-.055 2.038-.23 2.737-.498a5.962 5.962 0 002.153-1.4 5.962 5.962 0 001.4-2.153c.268-.699.443-1.507.498-2.737.056-1.233.072-1.64.072-5.261s-.016-4.028-.072-5.261c-.055-1.23-.23-2.038-.498-2.737a5.962 5.962 0 00-1.4-2.153A5.962 5.962 0 0019.877.57C19.178.302 18.37.127 17.14.072 15.907.016 15.5 0 11.879 0h.138zm-.017 2.179c3.563 0 3.99.016 5.4.072 1.3.06 2.006.278 2.476.463.622.242 1.066.532 1.532.998.466.466.756.91.998 1.532.185.47.403 1.176.463 2.476.056 1.41.072 1.837.072 5.4s-.016 3.99-.072 5.4c-.06 1.3-.278 2.006-.463 2.476-.242.622-.532 1.066-.998 1.532-.466.466-.91.756-1.532.998-.47.185-1.176.403-2.476.463-1.41.056-1.837.072-5.4.072s-3.99-.016-5.4-.072c-1.3-.06-2.006-.278-2.476-.463-.622-.242-1.066-.532-1.532-.998-.466-.466-.756-.91-.998-1.532-.185-.47-.403-1.176-.463-2.476-.056-1.41-.072-1.837-.072-5.4s.016-3.99.072-5.4c.06-1.3.278-2.006.463-2.476.242-.622.532-1.066.998-1.532.466-.466.91-.756 1.532-.998.47-.185 1.176-.403 2.476-.463 1.41-.056 1.837-.072 5.4-.072zm0 3.7a6.242 6.242 0 100 12.484 6.242 6.242 0 000-12.484zm0 10.305a4.063 4.063 0 110-8.126 4.063 4.063 0 010 8.126zm7.965-10.542a1.458 1.458 0 11-2.916 0 1.458 1.458 0 012.916 0z' />
                        </svg>
                      ),
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className='bg-gray-800 rounded-lg p-4'>
                <p className='text-sm font-medium text-gray-300 mb-2 flex items-center'>
                  <span className='mr-2'>📍</span>
                  Office Address
                </p>
                <p className='text-gray-400 text-sm'>
                  PayWallet Tower, Level 10
                  <br />
                  Gulshan Avenue, Dhaka-1212
                  <br />
                  Bangladesh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Copyright Bar */}
      <div className='border-t border-gray-800 bg-gray-950'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0'>
            <div className='text-sm text-gray-400 text-center md:text-left'>
              © {currentYear} PayWallet Ltd. All rights reserved. | Licensed by
              Bangladesh Bank
            </div>

            <div className='flex flex-wrap justify-center items-center gap-4 text-sm'>
              <a
                href='/privacy&policy'
                className='text-gray-400 hover:text-white transition-colors hover:underline'
              >
                Privacy Policy
              </a>
              <span className='text-gray-600'>•</span>
              <a
                href='/terms'
                className='text-gray-400 hover:text-white transition-colors hover:underline'
              >
                Terms of Service
              </a>
              <span className='text-gray-600'>•</span>
              <a
                href='/compliance'
                className='text-gray-400 hover:text-white transition-colors hover:underline'
              >
                Compliance
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
