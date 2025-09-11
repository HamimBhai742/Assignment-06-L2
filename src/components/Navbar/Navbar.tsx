/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { authApi, useLogoutMutation } from '../../redux/api/authApi';
import { useAppDispatch } from '../../redux/hook/hooks';
import { Role } from '../../interfaces/role.interfaces';
import { ModeToggle } from '../mode-toggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { data, isLoading } = useAuth();
  const [logOut] = useLogoutMutation();
  const dispatch = useAppDispatch();
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
    { name: 'Contact', href: '/contact' },
  ];
  const handleLogout = async () => {
    try {
      const res = await logOut();
      if (res.data) {
        toast.success(res.data.message);
        dispatch(authApi.util.resetApiState());
      }
    } catch (error) {
      toast.error('Failed to logout');
    }
  };
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-purple-700 dark:bg-gray-900 shadow-xl' : 'bg-purple-700 dark:bg-gray-900'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Link
              to='/'
              className={`text-2xl font-bold transition-colors duration-300 text-white dark:text-white`}
            >
              PayWallet
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden lg:block'>
            <div className='ml-10 flex items-baseline space-x-8'>
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-300 hover:scale-105 ${
                      location.pathname === link.href 
                        ? 'text-blue-400 dark:text-blue-300 font-semibold' 
                        : isScrolled
                        ? 'text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400'
                        : 'text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.name}
                  </NavLink>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2  font-medium transition-colors duration-300 hover:scale-105 ${
                      isScrolled
                        ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
                        : 'text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400'
                    }`}
                  >
                    {link.name}
                  </a>
                )
              )}
            </div>
          </div>
          {/* Auth Buttons */}

          <div className='flex items-center space-x-4 '>
           <div className='hidden lg:block hover:cursor-pointer'>
             <ModeToggle />
           </div>
            {data || isLoading ? (
              <div className='hidden lg:flex items-center space-x-3'>
                <Link
                  to={
                    data?.role === Role.USER
                      ? '/dashboard'
                      : `/${data?.role?.toLowerCase()}-dashboard`
                  }
                  className='px-4 py-2 text-sm font-medium text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400 transition-colors'
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout}>
                  <Link
                    to='/'
                    className='px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-purple-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors'
                  >
                    Sign Out
                  </Link>
                </button>
              </div>
            ) : (
              <div className='hidden lg:flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='px-4 py-2 text-sm font-medium text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400 transition-colors'
                >
                  Sign In
                </Link>
                <Link
                  to='/register'
                  className='px-4 py-2 text-sm font-medium bg-white dark:bg-gray-700 text-purple-700 dark:text-gray-200 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors'
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='lg:hidden flex items-center gap-3'>
            <ModeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white dark:text-gray-200'
              }`}
            >
              <svg
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {isOpen ? (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                ) : (
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className='lg:hidden'>
            <div
              className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-all duration-300 ${
                isScrolled ? 'bg-white/95 dark:bg-gray-800/95' : 'bg-black/20 dark:bg-gray-800/80'
              } backdrop-blur-md rounded-lg mt-2`}
            >
              {navLinks.map((link) =>
                link.href.startsWith('/') ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`block px-3 py-2 text-base font-medium transition-colors duration-300 rounded-md ${
                      location.pathname === link.href 
                        ? 'text-blue-400 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 font-semibold' 
                        : isScrolled
                        ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        : 'text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-gray-700/50'
                    }`}
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
                        ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        : 'text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-gray-700/50'
                    } rounded-md`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              )}

              {/* Mobile Auth Links */}
              <div className='border-t border-white/20 dark:border-gray-600/50 pt-3 mt-3 space-y-2'>
                <Link
                  to='/login'
                  className={`block px-3 py-2 text-base font-medium transition-colors duration-300 ${
                    isScrolled
                      ? 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      : 'text-white dark:text-gray-200 hover:text-blue-300 dark:hover:text-blue-400 hover:bg-white/10 dark:hover:bg-gray-700/50'
                  } rounded-md`}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to='/register'
                  className='block px-3 py-2 text-base font-medium bg-white dark:bg-gray-700 text-purple-700 dark:text-gray-200 rounded-md hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors'
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
