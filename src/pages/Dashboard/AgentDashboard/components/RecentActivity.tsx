import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, ClockIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  type: 'cash-in' | 'cash-out';
  amount: number;
  customer: string;
  phone: string;
  time: string;
  status: 'completed' | 'pending' | 'failed';
}

const RecentActivity: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cash-in' | 'cash-out'>('all');

  const transactions: Transaction[] = [
    {
      id: 'TXN001',
      type: 'cash-in',
      amount: 2500,
      customer: 'Rahul Ahmed',
      phone: '01712345678',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN002',
      type: 'cash-out',
      amount: 1800,
      customer: 'Fatima Khan',
      phone: '01798765432',
      time: '5 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN003',
      type: 'cash-in',
      amount: 5000,
      customer: 'Mohammad Ali',
      phone: '01687654321',
      time: '12 minutes ago',
      status: 'pending'
    },
    {
      id: 'TXN004',
      type: 'cash-out',
      amount: 750,
      customer: 'Nasir Uddin',
      phone: '01534567890',
      time: '18 minutes ago',
      status: 'completed'
    },
    {
      id: 'TXN005',
      type: 'cash-in',
      amount: 3200,
      customer: 'Ayesha Begum',
      phone: '01623456789',
      time: '25 minutes ago',
      status: 'failed'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' || transaction.type === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-4 w-4 text-gray-500" />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value as any)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Transactions</option>
                <option value="cash-in">Cash In</option>
                <option value="cash-out">Cash Out</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'cash-in' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {transaction.type === 'cash-in' ? (
                    <ArrowDownIcon className="h-5 w-5 text-green-600" />
                  ) : (
                    <ArrowUpIcon className="h-5 w-5 text-red-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{transaction.customer}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{transaction.phone}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ClockIcon className="h-3 w-3 text-gray-400" />
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${
                  transaction.type === 'cash-in' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'cash-in' ? '+' : '-'}৳{transaction.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-1">ID: {transaction.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-100">
        <button className="w-full text-center text-blue-600 hover:text-blue-700 font-medium text-sm py-2 hover:bg-blue-50 rounded-lg transition-colors">
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
