import { Link } from 'react-router';

const QuickActions = () => {
  const actions = [
    {
      title: 'Deposit Money',
      description: 'Add funds to wallet',
      icon: '💰',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      href: '/dashboard/deposit'
    },
    {
      title: 'Withdraw Money',
      description: 'Cash out from agents',
      icon: '💸',
      color: 'bg-red-500',
      hoverColor: 'hover:bg-red-600',
      href: '/dashboard/withdraw'
    },
    {
      title: 'Send Money',
      description: 'Transfer to any number',
      icon: '📤',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      href: '/dashboard/send'
    },
    {
      title: 'Transaction',
      description: 'Show your transaction history',
      icon: '🧾',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      href: '/dashboard/transactions'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            to={action.href}
            className="group flex flex-col items-center p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:scale-110 transform duration-200`}>
              <span className="text-xl text-white">{action.icon}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-900 text-center mb-1">
              {action.title}
            </h3>
            <p className="text-xs text-gray-500 text-center leading-tight">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
