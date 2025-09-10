import { useState } from 'react';
import type { DepositData } from '../Deposit';

interface AmountStepProps {
  data: DepositData;
  updateData: (data: Partial<DepositData>) => void;
  onNext: () => void;
}

const AmountStep = ({ data, updateData, onNext }: AmountStepProps) => {
  const [amount, setAmount] = useState(data.amount || '');
  const [error, setError] = useState('');

  const quickAmounts = [500, 1000, 2000, 5000, 10000, 20000];

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

    if (numAmount < 50) {
      setError('Minimum deposit amount is ৳50');
      return;
    }

    if (numAmount > 100000) {
      setError('Maximum deposit amount is ৳1,00,000');
      return;
    }

    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">💰</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enter Amount</h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">How much would you like to deposit?</p>
      </div>

      {/* Amount Input */}
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">
            ৳
          </div>
          <input
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="w-full pl-8 pr-4 py-4 text-2xl font-bold text-center border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="0"
            min="50"
            max="100000"
          />
        </div>

        {error && (
          <p className="text-red-500 dark:text-red-400 text-sm text-center">{error}</p>
        )}

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Min: ৳50 • Max: ৳1,00,000
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Quick Select</p>
        <div className="grid grid-cols-3 gap-3">
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => handleQuickAmount(value)}
              className={`py-3 px-4 text-sm font-medium rounded-lg border transition-all ${
                data.amount === value
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                  : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              ৳{value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Deposit Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-lg">ℹ️</span>
          <div>
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200">Deposit Information</h4>
            <ul className="text-xs text-blue-700 dark:text-blue-300 mt-1 space-y-1">
              <li>• Instant deposit available 24/7</li>
              <li>• No additional charges for bank transfers</li>
              <li>• Card deposits may have 1.5% fee</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={!data.amount || data.amount < 50}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
};

export default AmountStep;
