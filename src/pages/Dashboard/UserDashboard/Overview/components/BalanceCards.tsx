const BalanceCards = () => {
  const balanceData = [
    {
      title: 'Main Balance',
      amount: 25750,
      currency: '৳',
      change: '+12.5%',
      changeType: 'increase',
      icon: '💰',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Savings',
      amount: 15000,
      currency: '৳',
      change: '+5.2%',
      changeType: 'increase',
      icon: '🏦',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      title: 'Pending',
      amount: 1250,
      currency: '৳',
      change: '-2.1%',
      changeType: 'decrease',
      icon: '⏳',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Cashback',
      amount: 850,
      currency: '৳',
      change: '+8.7%',
      changeType: 'increase',
      icon: '🎁',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {balanceData.map((item, index) => (
        <div
          key={index}
          className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
        >
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-5`}></div>
          
          <div className="relative p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-xl text-white">{item.icon}</span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                item.changeType === 'increase' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {item.change}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-600 mb-1">{item.title}</h3>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold text-gray-900">
                  {item.currency}{item.amount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center space-x-1">
              <span className={`text-xs ${
                item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.changeType === 'increase' ? '↗️' : '↘️'}
              </span>
              <span className="text-xs text-gray-500">vs last month</span>
            </div>
          </div>

          {/* Bottom accent */}
          <div className={`h-1 bg-gradient-to-r ${item.gradient}`}></div>
        </div>
      ))}
    </div>
  );
};

export default BalanceCards;
