import BalanceCards from './components/BalanceCards';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';

const Overview = () => {
  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Dashboard Overview
          </h1>
          <p className='text-gray-600 mt-1'>
            Welcome back! Here's your financial summary.
          </p>
        </div>
        <div className='mt-4 sm:mt-0'>
          <span className='text-sm text-gray-500'>
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Balance Cards */}
      <BalanceCards />
      {/* Quick Actions */}
      <QuickActions />
      <div>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Overview;
