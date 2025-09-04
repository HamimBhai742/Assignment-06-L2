import type{ Transaction } from '../Transactions';

interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  isEmpty: boolean;
}

const TransactionList = ({ transactions, isLoading, isEmpty }: TransactionListProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send': return '💸';
      case 'receive': return '📥';
      case 'deposit': return '💰';
      case 'withdraw': return '🏧';
      case 'bill': return '🧾';
      case 'recharge': return '📱';
      default: return '💳';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send': return 'text-red-600';
      case 'receive': return 'text-green-600';
      case 'deposit': return 'text-blue-600';
      case 'withdraw': return 'text-orange-600';
      case 'bill': return 'text-purple-600';
      case 'recharge': return 'text-pink-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="text-right space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl">📋</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Transactions Found</h3>
        <p className="text-gray-600 mb-6">
          No transactions match your current filters. Try adjusting your search criteria.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              {/* Transaction Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">{getTransactionIcon(transaction.type)}</span>
              </div>

              {/* Transaction Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {transaction.description}
                    </h3>

                    <div className="space-y-1">
                      {transaction.recipient && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">To:</span> {transaction.recipient}
                        </p>
                      )}
                      {transaction.sender && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">From:</span> {transaction.sender}
                        </p>
                      )}
                      {transaction.reference && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Note:</span> {transaction.reference}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-xs text-gray-500">
                        ID: {transaction.id}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(transaction.date)} • {formatTime(transaction.date)}
                      </span>
                      {transaction.fee && transaction.fee > 0 && (
                        <span className="text-xs text-orange-600">
                          Fee: ৳{transaction.fee}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount and Status */}
                  <div className="text-right ml-4">
                    <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'receive' || transaction.type === 'deposit' ? '+' : '-'}
                      ৳{transaction.amount.toLocaleString()}
                    </div>

                    <div className="mt-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status === 'completed' && '✅ Completed'}
                        {transaction.status === 'pending' && '⏳ Pending'}
                        {transaction.status === 'failed' && '❌ Failed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View - Stacked Layout */}
            <div className="md:hidden mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(transaction.date)}
                  </span>
                </div>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>

            {/* Desktop View - Action Button */}
            <div className="hidden md:block">
              <div className="flex justify-end mt-3">
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
