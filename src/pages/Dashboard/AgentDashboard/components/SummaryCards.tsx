import React from 'react';
import { ArrowUpIcon, ArrowDownIcon, WalletIcon, UsersIcon } from '@heroicons/react/24/outline';

const SummaryCards: React.FC = () => {
  const summaryData = [
    {
      title: 'Total Balance',
      amount: '৳45,250.00',
      icon: WalletIcon,
      color: 'bg-blue-500',
      change: '+5.2%',
      changeType: 'positive'
    },
    {
      title: 'Cash In Today',
      amount: '৳12,450.00',
      icon: ArrowDownIcon,
      color: 'bg-green-500',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Cash Out Today',
      amount: '৳8,750.00',
      icon: ArrowUpIcon,
      color: 'bg-red-500',
      change: '-3.2%',
      changeType: 'negative'
    },
    {
      title: 'Active Customers',
      amount: '1,247',
      icon: UsersIcon,
      color: 'bg-purple-500',
      change: '+8.1%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
      {summaryData.map((item, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className={`${item.color} p-3 rounded-lg`}>
              <item.icon className="h-6 w-6 text-white" />
            </div>
            <span className={`text-sm font-medium ${
              item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change}
            </span>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">{item.title}</p>
            <p className="text-2xl font-bold text-gray-900">{item.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
