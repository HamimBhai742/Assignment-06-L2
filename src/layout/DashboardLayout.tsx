import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { Role } from '../interfaces/role.interfaces';
import { useMyProfileQuery } from '../redux/api/userApi';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { data } = useAuth();
  const { data: profile } = useMyProfileQuery(undefined);
  console.log(profile);
  const userMenuItems = [
    { name: 'Overview', href: '/dashboard', icon: '📊' },
    { name: 'Deposit Money', href: '/dashboard/deposit', icon: '💰' },
    { name: 'Withdraw Money', href: '/dashboard/withdraw', icon: '💸' },
    { name: 'Send Money', href: '/dashboard/send', icon: '📤' },
    { name: 'Transactions', href: '/dashboard/transactions', icon: '📋' },
    // { name: 'Cards', href: '/dashboard/cards', icon: '💳' },
    // { name: 'Bills', href: '/dashboard/bills', icon: '🧾' },
    { name: 'Profile', href: '/dashboard/profile', icon: '👤' },
  ];

  const agentMenuItems = [
    { name: 'Overview', href: '/agent-dashboard', icon: '📊' },
    { name: 'Cash In', href: '/agent-dashboard/cash-in', icon: '💸' },
    { name: 'Cash Out', href: '/agent-dashboard/cash-out', icon: '📤' },
    { name: 'Transactions', href: '/agent-dashboard/transactions', icon: '📋' },
    { name: 'Profile', href: '/agent-dashboard/profile', icon: '👤' },
  ];

  const adminMenuItems = [
    { name: 'Overview', href: '/admin-dashboard', icon: '📊' },
    { name: 'Manage Users', href: '/admin-dashboard/users', icon: '👥' },
    { name: 'Manage Agents', href: '/admin-dashboard/agents', icon: '🏪' },
    {
      name: 'All Transactions',
      href: '/admin-dashboard/all-transactions',
      icon: '📋',
    },
    { name: 'Profile', href: '/admin-dashboard/profile', icon: '👤' },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        {/* Logo */}
        <div className='flex items-center justify-between h-16 px-6 border-b border-gray-200'>
          <Link to='/' className='text-xl font-bold text-purple-600'>
            PayWallet
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className='lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600'
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        {data?.role === Role.USER && (
          <nav className='mt-6 px-3'>
            <div className='space-y-1'>
              {userMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className='mr-3 text-lg'>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {data?.role === Role.AGENT && (
          <nav className='mt-6 px-3'>
            <div className='space-y-1'>
              {agentMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className='mr-3 text-lg'>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {data?.role === Role.ADMIN && (
          <nav className='mt-6 px-3'>
            <div className='space-y-1'>
              {adminMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === item.href
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className='mr-3 text-lg'>{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* User Info */}
        <div className='absolute bottom-0 w-full p-4 border-t border-gray-200'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
              <span className='text-purple-600 font-semibold'>
                {profile?.data?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-gray-900 truncate'>
                {profile?.data?.name}
              </p>
              <p className='text-xs text-gray-500 truncate'>
                {profile?.data?.phone}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 lg:ml-0'>
        {/* Top Header */}
        <header className='bg-white shadow-sm border-b border-gray-200'>
          <div className='flex items-center justify-between h-16 px-4 sm:px-6'>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className='lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>

            <div className='flex items-center space-x-4'>
              <button className='p-2 text-gray-400 hover:text-gray-600 rounded-full'>
                <span className='text-xl'>🔔</span>
              </button>
              <button className='p-2 text-gray-400 hover:text-gray-600 rounded-full'>
                <span className='text-xl'>⚙️</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 p-3 sm:p-4 lg:p-6 overflow-x-hidden'>
          <div className='max-w-full'>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
