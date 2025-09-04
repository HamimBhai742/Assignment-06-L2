import type{ WithdrawData } from '../Withdraw';

interface MethodStepProps {
  data: WithdrawData;
  updateData: (data: Partial<WithdrawData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const MethodStep = ({ data, updateData, onNext, onPrev }: MethodStepProps) => {
  const withdrawMethods = [
    {
      id: 'agent',
      title: 'Agent Point',
      description: 'Cash out from nearby agent',
      icon: '🏪',
      fee: '৳10-20',
      time: 'Instant',
      availability: '24/7',
      gradient: 'from-green-500 to-emerald-600',
      popular: true
    },
    {
      id: 'atm',
      title: 'ATM Withdrawal',
      description: 'Use PayWallet card at ATM',
      icon: '🏧',
      fee: '৳15',
      time: 'Instant',
      availability: '24/7',
      gradient: 'from-blue-500 to-blue-600',
      popular: false
    },
    {
      id: 'bank',
      title: 'Bank Transfer',
      description: 'Transfer to bank account',
      icon: '🏦',
      fee: 'Free',
      time: '1-2 hours',
      availability: 'Business hours',
      gradient: 'from-purple-500 to-purple-600',
      popular: false
    }
  ];

  const handleMethodSelect = (method: 'agent' | 'atm' | 'bank') => {
    updateData({ method });
  };

  const handleNext = () => {
    if (!data.method) return;
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">🏧</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Withdrawal Method</h2>
        <p className="text-gray-600 text-sm">Choose how you want to withdraw ৳{data.amount?.toLocaleString()}</p>
      </div>

      {/* Withdrawal Methods */}
      <div className="space-y-4">
        {withdrawMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id as 'agent' | 'atm' | 'bank')}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left relative ${
              data.method === method.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {/* Popular Badge */}
            {method.popular && (
              <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Popular
              </div>
            )}

            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center`}>
                <span className="text-xl text-white">{method.icon}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{method.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      method.fee === 'Free'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {method.fee}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-2">{method.description}</p>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1">
                    <span>⏱️</span>
                    <span>{method.time}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🕒</span>
                    <span>{method.availability}</span>
                  </span>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                data.method === method.id
                  ? 'border-red-500 bg-red-500'
                  : 'border-gray-300'
              }`}>
                {data.method === method.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Method Information */}
      {data.method && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-500 text-lg">ℹ️</span>
            <div>
              <h4 className="text-sm font-medium text-blue-900">
                {data.method === 'agent' && 'Agent Point Information'}
                {data.method === 'atm' && 'ATM Withdrawal Information'}
                {data.method === 'bank' && 'Bank Transfer Information'}
              </h4>
              <p className="text-xs text-blue-700 mt-1">
                {data.method === 'agent' && 'Find nearby agents, verify with OTP, and collect cash instantly.'}
                {data.method === 'atm' && 'Use your PayWallet card at any supported ATM nationwide.'}
                {data.method === 'bank' && 'Transfer directly to your linked bank account within 1-2 hours.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!data.method}
          className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default MethodStep;
