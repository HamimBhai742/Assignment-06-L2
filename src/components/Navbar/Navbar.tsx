import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-purple-700  shadow-xl' : 'bg-purple-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className={`text-2xl font-bold transition-colors duration-300 text-white`}>
              PayWallet
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105 ${
                      isScrolled
                        ? 'text-white hover:text-blue-300'
                        : 'text-white hover:text-blue-300'
                    } ${location.pathname === link.href ? 'text-blue-600' : ''}`}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-blue-600'
                        : 'text-white hover:text-blue-300'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-all duration-300 ${
              isScrolled ? 'bg-white/95' : 'bg-black/20'
            } backdrop-blur-md rounded-lg mt-2`}>
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        : 'text-white hover:text-blue-300 hover:bg-white/10'
                    } rounded-md ${location.pathname === link.href ? 'text-blue-600' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                      isScrolled
                        ? 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                        : 'text-white hover:text-blue-300 hover:bg-white/10'
                    } rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;