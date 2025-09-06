import { useState } from 'react';
import type { AmountStepProps } from '../interfaces';
const AmountStep = ({ data, updateData, userBalance, onNext }: AmountStepProps) => {
  const [amount, setAmount] = useState(data.amount || '');
  const [error, setError] = useState('');

  const quickAmounts = [100,500, 1000, 2000, 5000, 10000];

  const handleAmountChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    setAmount(value);
    setError('');
    updateData({ amount: numValue });
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    updateData({ amount: value });
    setError('');
  };

  const handleNext = () => {
    const numAmount = parseFloat(amount.toString()) || 0;

    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (numAmount < 100) {
      setError('Minimum withdrawal amount is ৳100');
      return;
    }

    if (numAmount > userBalance) {
      setError('Insufficient balance');
      return;
    }

    if (numAmount > 25000) {
      setError('Maximum withdrawal limit is ৳25,000 per transaction');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">💸</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Withdrawal Amount</h2>
        <p className="text-gray-600 text-sm">How much would you like to withdraw?</p>
      </div>

      {/* Amount Input */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            ৳
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full pl-8 pr-4 py-4 text-2xl font-bold text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="0"
            min="100"
            max={Math.min(userBalance, 25000)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div className="text-center text-sm text-gray-500">
          Min: ৳100 • Max: ৳{Math.min(userBalance, 25000).toLocaleString()}
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">Quick Select</p>
        <div className="grid grid-cols-3 gap-3">
          {quickAmounts.filter(amount => amount <= userBalance).map((value) => (
            <button
              key={value}
              onClick={() => handleQuickAmount(value)}
              className={`py-3 px-4 text-sm font-medium rounded-lg border transition-all ${
                data.amount === value
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              ৳{value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Withdrawal Limits */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-orange-500 text-lg">⚠️</span>
          <div>
            <h4 className="text-sm font-medium text-orange-900">Withdrawal Limits</h4>
            <ul className="text-xs text-orange-700 mt-1 space-y-1">
              <li>• Daily limit: ৳50,000</li>
              <li>• Per transaction: ৳25,000</li>
              <li>• Agent fee: ৳10-20 (varies by location)</li>
              <li>• Available 24/7 at agent points</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={!data.amount || data.amount < 100 || data.amount > userBalance}
        className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default AmountStep;
