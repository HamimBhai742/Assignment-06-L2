/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useMatchPINMutation } from '../../../../../redux/api/authApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useWithdrawMoneyMutation } from '../../../../../redux/api/walletApi';
import type { ConfirmationStepProps, ResponseData } from '../interfaces';



const ConfirmationStep = ({
  data,
  userBalance,
  onPrev,
}: ConfirmationStepProps) => {
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [date, setDate] = useState('');
  const [matchPIN] = useMatchPINMutation();
  const [withdrawMoney] = useWithdrawMoneyMutation();
  const totalDeduction = data.amount || 0;

  const handleConfirm = async (totalAmount: number) => {
    if (!pin || pin.length !== 6) return;
    setIsProcessing(true);
    try {
      const match = await matchPIN(pin);
      if (match.data) {
        const res = await withdrawMoney(totalAmount);
        if (res?.data) {
          setResponse(res as ResponseData);
          const dates = format(
            new Date(res?.data?.data?.transaction[0]?.createdAt),
            'M/d/yyyy, h:mm:ss a'
          );
          setDate(dates);
        }
        if (res.error) {
          const err = res.error as { data: { message: string } };
          toast.error(err.data.message);
          setIsProcessing(false);
          return;
        }
        setIsSuccess(true);
        setIsProcessing(false);
      }
      if (match.error) {
        const err = match.error as { data: { message: string } };
        toast.error(err.data.message);
        setIsProcessing(false);
      }
    } catch (error) {
      setIsProcessing(false);
    }
  };
  const res = response?.data as {
    data: {
      message: string;
      transaction: { transactionId: string }[];
      wallet: { balance: number };
    };
  };
  if (isSuccess) {
    return (
      <div className='text-center space-y-6'>
        <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto'>
          <span className='text-3xl text-white'>✅</span>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            {res?.data?.message}
          </h2>
        </div>

        <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4'>
          <div className='text-sm space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Transaction ID:</span>
              <span className='font-mono text-gray-900 dark:text-white'>
                {res?.data?.transaction[0]?.transactionId}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Date & Time:</span>
              <span className='text-gray-900 dark:text-white'>{date && date}</span>
            </div>
          </div>
        </div>

        <div className='bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4'>
          <div className='flex items-start space-x-3'>
            <span className='text-orange-500 text-lg'>⚠️</span>
            <div>
              <h4 className='text-sm font-medium text-orange-900 dark:text-orange-200'>
                Important Instructions
              </h4>
              <ul className='text-xs text-orange-700 dark:text-orange-300 mt-1 space-y-1'>
                <li>
                  • Available amount: ৳
                  {/* {response?.data.wall.amount?.toLocaleString()} */}
                </li>
                <li>• Keep transaction receipt</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className='w-full bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-700 dark:to-pink-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all'
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => (window.location.href = '/dashboard/transactions')}
            className='w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-4 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors'
          >
            View Transactions
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl text-white'>✅</span>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          Confirm Withdrawal
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm'>
          Please review your withdrawal details
        </p>
      </div>

      {/* Withdrawal Summary */}
      <div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-600 dark:text-gray-300'>Withdrawal Amount</span>
          <span className='text-xl font-bold text-gray-900 dark:text-white'>
            ৳{data.amount?.toLocaleString()}
          </span>
        </div>

        <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-gray-900 dark:text-white'>Total Deduction</span>
            <span className='text-xl font-bold text-red-600 dark:text-red-400'>
              ৳{totalDeduction.toLocaleString()}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600 dark:text-gray-300'>Remaining Balance</span>
          <span className='text-gray-900 dark:text-white'>
            ৳{(userBalance - totalDeduction).toLocaleString()}
          </span>
        </div>
      </div>

      {/* PIN Input */}
      <div>
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
          Enter Transaction PIN
        </label>
        <input
          type='password'
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className='w-full px-4 py-3 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          placeholder='Enter your 6-digit PIN'
          maxLength={6}
        />
      </div>

      {/* Navigation Buttons */}
      <div className='flex space-x-4'>
        <button
          onClick={onPrev}
          disabled={isProcessing}
          className='flex-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-4 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50'
        >
          Back
        </button>
        <button
          onClick={() => handleConfirm(totalDeduction)}
          disabled={isProcessing || pin.length !== 6}
          className='flex-1 bg-gradient-to-r from-red-600 to-pink-600 dark:from-red-700 dark:to-pink-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50'
        >
          {isProcessing ? (
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Confirm Withdrawal'
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
