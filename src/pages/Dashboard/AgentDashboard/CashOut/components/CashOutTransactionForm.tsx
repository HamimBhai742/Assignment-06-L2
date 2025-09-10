/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  UserIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useMatchPINMutation } from '../../../../../redux/api/authApi';
import toast from 'react-hot-toast';
import { useMatchUserPinMutation } from '../../../../../redux/api/userApi';
import type { CashOutTransactionFormProps } from '../interface';


const CashOutTransactionForm: React.FC<CashOutTransactionFormProps> = ({
  user,
  onSubmit,
  onBack,
}) => {
  const [amount, setAmount] = useState('');
  const [customerPin, setCustomerPin] = useState('');
  const [agentPin, setAgentPin] = useState('');
  const [showCustomerPin, setShowCustomerPin] = useState(false);
  const [showAgentPin, setShowAgentPin] = useState(false);
  const [matchPIN] = useMatchPINMutation();
  const [matchUserPin] = useMatchUserPinMutation();
  const [process, setProcess] = useState(false);
  const quickAmounts = [500, 1000, 2000, 5000];
  const withdrawalAmount = parseFloat(amount) || 0;
  const charge =
    withdrawalAmount > 0 ? Number(withdrawalAmount / 1000) * 18.5 : 0;
  const totalDeduction = withdrawalAmount + charge;
  const remainingBalance = user.balance - totalDeduction;
  const isValidAmount =
    withdrawalAmount >= 50 && totalDeduction <= user.balance;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcess(true);
    if (!amount || !customerPin || !agentPin || !isValidAmount) return;
    const resCustomer = {
      phone: user.phone,
      pin: customerPin,
    };
    const resUSer = await matchUserPin(resCustomer);
    if (resUSer.error) {
      setProcess(false);
      toast.error("User pin doesn't match");
      return;
    }

    const res = await matchPIN(agentPin);
    if (res.error) {
      setProcess(false);
      toast.error("Agent pin doesn't match");
      return;
    }

    onSubmit({
      amount: withdrawalAmount,
      charge,
      totalDeduction,
      customerPin,
      agentPin,
      timestamp: new Date().toISOString(),
    });
    setProcess(false);
  };
  return (
    <div className='p-6'>
      {/* Header with Back Button */}
      <div className='flex items-center mb-6'>
        <button
          onClick={onBack}
          className='mr-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
        >
          <ArrowLeftIcon className='h-5 w-5 text-gray-600 dark:text-gray-300' />
        </button>
        <div>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Cash Out Amount
          </h2>
          <p className='text-gray-600 dark:text-gray-300 text-sm'>
            Enter amount to withdraw from customer account
          </p>
        </div>
      </div>

      {/* Selected User Info */}
      <div className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-4 mb-6'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center'>
            <UserIcon className='h-6 w-6 text-red-600 dark:text-red-400' />
          </div>
          <div>
            <div className='flex items-center space-x-2'>
              <h3 className='font-medium text-gray-900 dark:text-white'>{user.name}</h3>
              <CheckCircleIcon className='h-4 w-4 text-green-500 dark:text-green-400' />
            </div>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{user.phone}</p>
            <p className='text-sm font-medium text-gray-700 dark:text-gray-200'>
              Available Balance: ৳{user.balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Amount Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
            Withdrawal Amount
          </label>
          <div className='relative'>
            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg'>
              ৳
            </span>
            <input
              type='number'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='0.00'
              className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                amount && !isValidAmount
                  ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                  : 'border-gray-300 dark:border-gray-600 focus:ring-red-500'
              }`}
              min='50'
              max={user.balance}
              step='0.01'
              required
            />
          </div>
          {amount && withdrawalAmount < 50 && (
            <p className='text-red-600 dark:text-red-400 text-sm mt-1'>
              Minimum withdrawal amount is ৳50
            </p>
          )}
          {amount && totalDeduction > user.balance && (
            <p className='text-red-600 dark:text-red-400 text-sm mt-1'>
              Insufficient balance including charges
            </p>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <p className='text-sm font-medium text-gray-700 dark:text-gray-200 mb-3'>Quick Select</p>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
            {quickAmounts.map((quickAmount) => (
              <button
                key={quickAmount}
                type='button'
                onClick={() => setAmount(quickAmount.toString())}
                disabled={
                  quickAmount + Math.max(10, quickAmount * 0.015) > user.balance
                }
                className='py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:border-red-300 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              >
                ৳{quickAmount}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Summary */}
        {amount && isValidAmount && (
          <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-300'>Withdrawal Amount:</span>
              <span className='font-medium text-gray-900 dark:text-white'>
                ৳{withdrawalAmount.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-300'>Service Charge:</span>
              <span className='font-medium text-gray-900 dark:text-white'>৳{charge.toFixed(2)}</span>
            </div>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 dark:text-gray-300'>Total Deduction:</span>
              <span className='font-medium text-red-600 dark:text-red-400'>
                ৳{totalDeduction.toFixed(2)}
              </span>
            </div>
            <div className='border-t border-gray-200 dark:border-gray-600 pt-2'>
              <div className='flex justify-between'>
                <span className='font-medium text-gray-900 dark:text-white'>
                  Remaining Balance:
                </span>
                <span
                  className={`font-bold text-lg ${
                    remainingBalance < 100
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  ৳{remainingBalance.toFixed(2)}
                </span>
              </div>
            </div>
            {remainingBalance < 100 && (
              <div className='flex items-center space-x-2 text-yellow-600 dark:text-yellow-400 text-sm'>
                <ExclamationTriangleIcon className='h-4 w-4' />
                <span>Low balance warning</span>
              </div>
            )}
          </div>
        )}

        {/* Customer PIN Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
            Customer PIN
          </label>
          <div className='relative'>
            <input
              type={showCustomerPin ? 'text' : 'password'}
              value={customerPin}
              onChange={(e) => setCustomerPin(e.target.value)}
              placeholder="Customer's 6-digit PIN"
              className='w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              maxLength={6}
              pattern='[0-9]{6}'
              required
            />
            <button
              type='button'
              onClick={() => setShowCustomerPin(!showCustomerPin)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            >
              {showCustomerPin ? (
                <EyeSlashIcon className='h-5 w-5' />
              ) : (
                <EyeIcon className='h-5 w-5' />
              )}
            </button>
          </div>
        </div>

        {/* Agent PIN Input */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
            Agent PIN
          </label>
          <div className='relative'>
            <input
              type={showAgentPin ? 'text' : 'password'}
              value={agentPin}
              onChange={(e) => setAgentPin(e.target.value)}
              placeholder='Enter your 6-digit PIN'
              className='w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
              maxLength={6}
              pattern='[0-9]{6}'
              required
            />
            <button
              type='button'
              onClick={() => setShowAgentPin(!showAgentPin)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            >
              {showAgentPin ? (
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
          disabled={
            !amount ||
            !customerPin ||
            !agentPin ||
            customerPin.length !== 6 ||
            agentPin.length !== 6 ||
            !isValidAmount ||
            process
          }
          className='w-full bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-3 rounded-lg font-medium text-lg transition-colors'
        >
          {process ? 'Processing....' : 'Proceed to Confirm'}
        </button>
      </form>
    </div>
  );
};

export default CashOutTransactionForm;
