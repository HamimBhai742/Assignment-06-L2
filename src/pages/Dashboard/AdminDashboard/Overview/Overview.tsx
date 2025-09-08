// import { useGetAdminStatsQuery } from '../../../../redux/api/adminApi';
import { useDemoAdminStats } from '../../../../hooks/useDemoAdminStats';
import StatCard from './StatCard';
import TransactionChart from './TransactionChart';
import VolumeChart from './VolumeChart';
import QuickStatsBar from './QuickStatsBar';
import { 
  UsersIcon, 
  UserGroupIcon, 
  CreditCardIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline';

const Overview = () => {
  // const { data: stats, isLoading } = useGetAdminStatsQuery();
  const { data: stats, isLoading } = useDemoAdminStats();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="h-8 bg-gray-200 rounded-lg w-64 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse mt-4 sm:mt-0"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-20 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats Loading */}
        <div className="mt-8 bg-gray-200 rounded-2xl p-6 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-300 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="h-5 w-5 bg-gray-400 rounded"></div>
                  <div className="h-4 w-8 bg-gray-400 rounded-full"></div>
                </div>
                <div className="h-3 bg-gray-400 rounded w-20 mb-1"></div>
                <div className="h-5 bg-gray-400 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Loading Skeletons */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          <div className="xl:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              </div>
            </div>
            <div className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
          <div className="xl:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="h-6 bg-gray-200 rounded w-40 animate-pulse mb-6"></div>
            <div className="h-80 bg-gray-100 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="mt-4 sm:mt-0">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={UsersIcon}
          color="blue"
          trend={stats?.userGrowth || 0}
        />
        <StatCard
          title="Total Agents"
          value={stats?.totalAgents || 0}
          icon={UserGroupIcon}
          color="green"
          trend={stats?.agentGrowth || 0}
        />
        <StatCard
          title="Total Transactions"
          value={stats?.totalTransactions || 0}
          icon={CreditCardIcon}
          color="purple"
          trend={stats?.transactionGrowth || 0}
        />
        <StatCard
          title="Transaction Volume"
          value={stats?.totalVolume || 0}
          icon={CurrencyDollarIcon}
          color="orange"
          trend={stats?.volumeGrowth || 0}
          isAmount
        />
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-8">
        <QuickStatsBar
          todayTransactions={stats?.todayTransactions || 0}
          todayVolume={stats?.todayVolume || 0}
          activeUsers={stats?.activeUsers || 0}
          avgTransactionValue={stats?.avgTransactionValue || 0}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2">
          <TransactionChart data={stats?.transactionChart || []} />
        </div>
        <div className="xl:col-span-1">
          <VolumeChart data={stats?.volumeDistribution || []} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
