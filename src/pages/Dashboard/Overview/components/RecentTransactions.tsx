import { Link } from 'react-router';

const RecentTransactions = () => {
  const transactions = [
    {
      id: '1',
      type: 'send',
      title: 'Money Sent',
      recipient: 'Rahim Ahmed',
      amount: -1500,
      time: '2 hours ago',
      status: 'completed',
      icon: '↗️'
    },
    {
      id: '2',
      type: 'receive',
      title: 'Money Received',
      recipient: 'Fatima Khan',
      amount: +2500,
      time: '5 hours ago',
      status: 'completed',
      icon: '↙️'
    },
    {
      id: '3',
      type: 'bill',
      title: 'Electricity Bill',
      recipient: 'DESCO',
      amount: -850,
      time: '1 day ago',
      status: 'completed',
      icon: '⚡'
    },
    {
      id: '4',
      type: 'recharge',
      title: 'Mobile Recharge',
      recipient: 'Grameenphone',
      amount: -200,
      time: '2 days ago',
      status: 'completed',
      icon: '📱'
    },
    {
      id: '5',
      type: 'cashout',
      title: 'Cash Out',
      recipient: 'Agent Point',
      amount: -5000,
      time: '3 days ago',
      status: 'pending',
      icon: '🏧'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
        <Link 
          to="/dashboard/transactions"
          className="text-sm text-purple-600 hover:text-purple-700 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {/* Icon */}
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg">{transaction.icon}</span>
            </div>

            {/* Transaction Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  {transaction.title}
                </h3>
                <span className={`text-sm font-semibold ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}৳{Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500 truncate">
                  {transaction.recipient}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
              
              <p className="text-xs text-gray-400 mt-1">
                {transaction.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link 
          to="/dashboard/transactions"
          className="w-full py-2 text-sm text-purple-600 hover:text-purple-700 font-medium hover:bg-purple-50 rounded-lg transition-colors flex items-center justify-center"
        >
          View All Transactions →
        </Link>
      </div>
    </div>
  );
};

export default RecentTransactions;
