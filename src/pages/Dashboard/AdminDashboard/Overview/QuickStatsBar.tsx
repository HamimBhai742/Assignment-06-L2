import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ClockIcon } from '@heroicons/react/24/outline';

interface QuickStatsBarProps {
  todayTransactions: number;
  todayVolume: number;
  activeUsers: number;
  avgTransactionValue: number;
}

const QuickStatsBar = ({ todayTransactions, todayVolume, activeUsers, avgTransactionValue }: QuickStatsBarProps) => {
  const stats = [
    {
      label: "Today's Transactions",
      value: todayTransactions.toLocaleString(),
      icon: ClockIcon,
      change: '+12%',
      positive: true,
    },
    {
      label: "Today's Volume",
      value: `৳${todayVolume.toLocaleString()}`,
      icon: ArrowTrendingUpIcon,
      change: '+8%',
      positive: true,
    },
    {
      label: "Active Users (24h)",
      value: activeUsers.toLocaleString(),
      icon: ArrowTrendingUpIcon,
      change: '+5%',
      positive: true,
    },
    {
      label: "Avg Transaction",
      value: `৳${avgTransactionValue.toLocaleString()}`,
      icon: ArrowTrendingDownIcon,
      change: '-2%',
      positive: false,
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Today's Performance</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-white/80" />
              <span className={`text-xs px-2 py-1 rounded-full ${
                stat.positive
                  ? 'bg-green-500/20 text-green-100'
                  : 'bg-red-500/20 text-red-100'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-xs text-white/70 mb-1">{stat.label}</p>
            <p className="text-lg font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsBar;
