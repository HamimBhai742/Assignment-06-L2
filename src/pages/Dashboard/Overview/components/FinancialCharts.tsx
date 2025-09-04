import { useState } from 'react';

const FinancialCharts = () => {
  const [activeTab, setActiveTab] = useState('spending');

  // Mock data for spending chart
  const spendingData = [
    { category: 'Food & Dining', amount: 8500, percentage: 35, color: 'bg-blue-500' },
    { category: 'Transportation', amount: 4200, percentage: 17, color: 'bg-green-500' },
    { category: 'Shopping', amount: 3800, percentage: 16, color: 'bg-purple-500' },
    { category: 'Bills & Utilities', amount: 3200, percentage: 13, color: 'bg-orange-500' },
    { category: 'Entertainment', amount: 2100, percentage: 9, color: 'bg-pink-500' },
    { category: 'Others', amount: 2400, percentage: 10, color: 'bg-gray-500' }
  ];

  // Mock data for income vs expense
  const monthlyData = [
    { month: 'Jan', income: 45000, expense: 32000 },
    { month: 'Feb', income: 48000, expense: 35000 },
    { month: 'Mar', income: 52000, expense: 38000 },
    { month: 'Apr', income: 49000, expense: 36000 },
    { month: 'May', income: 55000, expense: 42000 },
    { month: 'Jun', income: 58000, expense: 45000 }
  ];

  const maxAmount = Math.max(...monthlyData.flatMap(d => [d.income, d.expense]));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header with Tabs */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Financial Analytics</h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('spending')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'spending'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Spending
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'trends'
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Trends
          </button>
        </div>
      </div>

      {/* Spending Breakdown */}
      {activeTab === 'spending' && (
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">This Month's Spending</h3>
            <p className="text-2xl font-bold text-gray-900">৳24,200</p>
            <p className="text-sm text-green-600">↓ 8% from last month</p>
          </div>

          <div className="space-y-4">
            {spendingData.map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.category}</span>
                    <span className="text-sm text-gray-900">৳{item.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-xs text-gray-500 w-8 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Income vs Expense Trends */}
      {activeTab === 'trends' && (
        <div>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Income vs Expense (Last 6 Months)</h3>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Income</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Expense</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">{data.month}</span>
                  <div className="flex space-x-4">
                    <span className="text-green-600">৳{data.income.toLocaleString()}</span>
                    <span className="text-red-600">৳{data.expense.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="relative">
                  {/* Income Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-1">
                    <div
                      className="h-3 bg-green-500 rounded-full"
                      style={{ width: `${(data.income / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                  
                  {/* Expense Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="h-3 bg-red-500 rounded-full"
                      style={{ width: `${(data.expense / maxAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Net Savings This Month</span>
              <span className="text-lg font-bold text-green-700">৳13,000</span>
            </div>
            <p className="text-xs text-green-600 mt-1">Great job! You're saving 22% of your income.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialCharts;
