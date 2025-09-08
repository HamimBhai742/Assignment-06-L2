import type{ DepositData } from '../Deposit';

interface PaymentMethodStepProps {
  data: DepositData;
  updateData: (data: Partial<DepositData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PaymentMethodStep = ({ data, updateData, onNext, onPrev }: PaymentMethodStepProps) => {
  const paymentMethods = [
    {
      id: 'bank',
      title: 'Bank Transfer',
      description: 'Transfer from your bank account',
      icon: '🏦',
      fee: 'Free',
      time: 'Instant',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'card',
      title: 'Debit/Credit Card',
      description: 'Use your Visa or Mastercard',
      icon: '💳',
      fee: '1.5%',
      time: 'Instant',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      id: 'mobile',
      title: 'Mobile Banking',
      description: 'bKash, Nagad, Rocket',
      icon: '📱',
      fee: 'Free',
      time: 'Instant',
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const handleMethodSelect = (method: 'bank' | 'card' | 'mobile') => {
    updateData({ method });
  };

  const handleNext = () => {
    if (!data.method) return;
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">💳</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Method</h2>
        <p className="text-gray-600 text-sm">Choose how you want to deposit ৳{data.amount?.toLocaleString()}</p>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleMethodSelect(method.id as 'bank' | 'card' | 'mobile')}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              data.method === method.id
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center`}>
                <span className="text-xl text-white">{method.icon}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900">{method.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      method.fee === 'Free'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {method.fee}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {method.time}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                data.method === method.id
                  ? 'border-purple-500 bg-purple-500'
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

      {/* Fee Information */}
      {data.method && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <span className="text-yellow-500 text-lg">💡</span>
            <div>
              <h4 className="text-sm font-medium text-yellow-900">Fee Information</h4>
              <p className="text-xs text-yellow-700 mt-1">
                {data.method === 'card'
                  ? `Card deposits have a 1.5% processing fee. You'll pay ৳${Math.ceil((data.amount || 0) * 0.015)} extra.`
                  : 'No additional fees for this payment method.'
                }
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
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodStep;
