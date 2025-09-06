import { useState } from 'react';
import type { AmountStepProps } from '../interfaces';


const AmountStep = ({
  data,
  updateData,
  userBalance,
  onNext,
  onPrev,
}: AmountStepProps) => {
  const [amount, setAmount] = useState(data.amount || '');
  const [error, setError] = useState('');

  const quickAmounts = [100, 500, 1000, 2000, 5000];

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
  const getFee = () => {
    if ((data.amount || 0) >= 100) return 5;
    return 0;
  };
  const fee = getFee();
  const totalDeduction = (data.amount || 0) + fee;

  const handleNext = () => {
    const numAmount = parseFloat(amount.toString()) || 0;

    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (numAmount < 10) {
      setError('Minimum send amount is ৳10');
      return;
    }

    if (numAmount > 25000) {
      setError('Maximum send amount is ৳25,000 per transaction');
      return;
    }

    if (totalDeduction > userBalance) {
      setError('Insufficient balance');
      return;
    }

    onNext();
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl text-white'>💰</span>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Enter Amount
        </h2>
        <p className='text-gray-600 text-sm'>
          Sending to{' '}
          <span className='font-semibold text-blue-600'>
            {data.recipientName}
          </span>
        </p>
      </div>

      {/* Recipient Info */}
      <div className='bg-gray-50 rounded-xl p-4'>
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
            <span className='text-lg'>👤</span>
          </div>
          <div className='flex-1'>
            <div className='flex items-center space-x-2'>
              <h3 className='font-medium text-gray-900'>
                {data.recipientName}
              </h3>
              {data.recipientVerified && (
                <span className='bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium'>
                  ✓ Verified
                </span>
              )}
            </div>
            <p className='text-sm text-gray-600'>+880 {data.recipientPhone}</p>
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className='space-y-4'>
        <div className='relative'>
          <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium'>
            ৳
          </div>
          <input
            type='number'
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className='w-full pl-8 pr-4 py-4 text-2xl font-bold text-center border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder='0'
            min='10'
            max='25000'
          />
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <div className='text-center text-sm text-gray-500'>
          Min: ৳10 • Max: ৳25,000
        </div>
      </div>

      {/* Quick Amount Buttons */}
      <div>
        <p className='text-sm font-medium text-gray-700 mb-3'>Quick Select</p>
        <div className='grid grid-cols-3 gap-3'>
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => handleQuickAmount(value)}
              className={`py-3 px-4 text-sm font-medium rounded-lg border transition-all ${
                data.amount === value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              ৳{value.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Fee Information */}
      {data.amount && data.amount > 0 && (
        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-600'>Send Amount</span>
              <span className='font-semibold text-gray-900'>
                ৳{data.amount.toLocaleString()}
              </span>
            </div>

            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-600'>Service Fee</span>
              <span
                className={`font-semibold ${
                  fee === 0 ? 'text-green-600' : 'text-gray-900'
                }`}
              >
                {fee === 0 ? 'Free' : `৳${fee}`}
              </span>
            </div>

            <div className='border-t border-blue-200 pt-2'>
              <div className='flex justify-between items-center'>
                <span className='font-semibold text-blue-900'>
                  Total Deduction
                </span>
                <span className='font-bold text-blue-900'>
                  ৳{totalDeduction.toLocaleString()}
                </span>
              </div>
            </div>

            <div className='flex justify-between items-center text-sm'>
              <span className='text-gray-600'>Remaining Balance</span>
              <span className='text-gray-900'>
                ৳{(userBalance - totalDeduction).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Fee Notice */}
      <div
        className={`border rounded-lg p-4 ${
          data.recipientVerified
            ? 'bg-green-50 border-green-200'
            : 'bg-orange-50 border-orange-200'
        }`}
      >
        <div className='flex items-start space-x-3'>
          <span
            className={`text-lg ${
              data.recipientVerified ? 'text-green-500' : 'text-orange-500'
            }`}
          >
            {data.recipientVerified ? '✅' : '⚠️'}
          </span>
          <div>
            <h4
              className={`text-sm font-medium ${
                data.recipientVerified ? 'text-green-900' : 'text-orange-900'
              }`}
            >
              {data.recipientVerified
                ? 'No Fee - Verified User'
                : 'Service Fee Applied'}
            </h4>
            <p
              className={`text-xs mt-1 ${
                data.recipientVerified ? 'text-green-700' : 'text-orange-700'
              }`}
            >
              {data.recipientVerified
                ? 'Free transfers to all verified PayWallet users'
                : 'Small fee applies for unverified users'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className='flex space-x-4'>
        <button
          onClick={onPrev}
          className='flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors'
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={
            !data.amount || data.amount < 10 || totalDeduction > userBalance
          }
          className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default AmountStep;
