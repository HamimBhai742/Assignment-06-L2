/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  UserIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useMatchPINMutation } from '../../../../../redux/api/authApi';
import toast from 'react-hot-toast';
import type { TransactionFormProps } from '../intefaces';

const TransactionForm: React.FC<TransactionFormProps> = ({
  user,
  onSubmit,
  onBack,
}) => {
  const [amount, setAmount] = useState(0);
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [process, setProcess] = useState(false);
  const [matchPIN] = useMatchPINMutation();
  const quickAmounts = [500, 1000, 2000, 5000];
  const handleSubmit = async (e: React.FormEvent) => {
    setProcess(true);
    e.preventDefault();

    if (!amount || !pin) return;
    const res = await matchPIN(pin);
    if (res.error) {
      setProcess(false);
      const err = res.error as { data: { message: string } };
      toast.error(err.data.message);
      return;
    }
    onSubmit({
      amount,
      pin,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div className='p-6'>
      {/* Header with Back Button */}
      <div className='flex items-center mb-6'>
        <button
          onClick={onBack}
          className='mr-3 p-2 hover:bg-gray-100 rounded-lg transition-colors'
        >
          <ArrowLeftIcon className='h-5 w-5 text-gray-600' />
        </button>
        <div>
          <h2 className='text-xl font-semibold text-gray-900'>
            Cash In Amount
          </h2>
          <p className='text-gray-600 text-sm'>
            Enter amount to add to customer account
          </p>
        </div>
      </div>

      {/* Selected User Info */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'>
            <UserIcon className='h-6 w-6 text-blue-600' />
          </div>
          <div>
            <div className='flex items-center space-x-2'>
              <h3 className='font-medium text-gray-900'>{user.name}</h3>
              {user.verified && (
                <CheckCircleIcon className='h-4 w-4 text-green-500' />
              )}
            </div>
            <p className='text-sm text-gray-600'>{user.phone}</p>
            <p className='text-sm text-gray-500'>
              Current Balance: ৳{user?.balance?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Amount Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Amount to Add
          </label>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg'>
              ৳
            </span>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value as unknown as number)}
              placeholder='0.00'
              className='w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg'
              min='10'
              max='50000'
              step='0.01'
              required
            />
          </div>
          {amount > user?.myBalance && (
            <p className='text-red-500 text-sm'>
              You don't have enough balance
            </p>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <p className='text-sm font-medium text-gray-700 mb-3'>Quick Select</p>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                type='button'
                onClick={() => setAmount(quickAmount)}
                className='py-2 px-4 border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-sm font-medium transition-colors'
              >
                ৳{quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Summary */}
        {amount && (
          <div className='bg-gray-50 rounded-lg p-4 space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Amount:</span>
              <span className='font-medium'>
                ৳{amount?.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600'>Service Charge:</span>
              <span className='font-semibold text-blue-600'>Free</span>
            </div>
            <div className='border-t border-gray-200 pt-2'>
              <div className='flex justify-between'>
                <span className='font-medium text-gray-900'>Total Amount:</span>
                <span className='font-bold text-lg text-blue-600'>
                  ৳{amount?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
        {/* PIN Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Agent PIN
          </label>
          <div className='relative'>
            <input
              type={showPin ? 'text' : 'password'}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder='Enter your 6-digit PIN'
              className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              maxLength={6}
              pattern='[0-9]{6}'
              required
            />
            <button
              type='button'
              onClick={() => setShowPin(!showPin)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
            >
              {showPin ? (
                <EyeSlashIcon className='h-5 w-5' />
              ) : (
                <EyeIcon className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={!amount || !pin || pin.length !== 6 || process||amount > user?.myBalance}
          className='w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium text-lg transition-colors'
        >
          {process ? 'Processing....' : 'Proceed to Confirm'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
