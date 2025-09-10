/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import type { DepositData } from '../Deposit';
import { useMyProfileQuery } from '../../../../../redux/api/userApi';
import { useDepositMoneyMutation } from '../../../../../redux/api/walletApi';
import { useMatchPINMutation } from '../../../../../redux/api/authApi';
import type { ResponseData } from '../../Withdraw/interfaces';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

interface ConfirmationStepProps {
  data: DepositData;
  onPrev: () => void;
}

const ConfirmationStep = ({ data, onPrev }: ConfirmationStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [date, setDate] = useState('');
  const [pin, setPin] = useState('');
  const { data: p } = useMyProfileQuery(undefined);
  const [matchPIN] = useMatchPINMutation();
  const [depositMoney] = useDepositMoneyMutation();

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate API call
    try {
      const match = await matchPIN(pin);
      if (match.data) {
        const res = await depositMoney(data.amount);
        if (res?.data) {
          toast.success('Deposit successful');
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
      toast.error('Deposit failed. Please try again.');    } finally {
      setIsProcessing(false);
    }
  };
  if (isSuccess) {
    return (
      <div className='text-center space-y-6'>
        <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto'>
          <span className='text-3xl text-white'>✅</span>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Deposit Successful!
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            ৳{data.amount?.toLocaleString()} has been added to your account
          </p>
        </div>

        <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4'>
          <div className='text-sm space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Transaction ID:</span>
              <span className='font-mono text-gray-900 dark:text-white'>
                {response?.data?.data?.transaction[0]?.transactionId}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Date & Time:</span>
              <span className='text-gray-900 dark:text-white'>{date}</span>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className='w-full bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-700 dark:to-blue-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all'
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
        <div className='w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl text-white'>✅</span>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          Confirm Deposit
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm'>
          Please review your deposit details
        </p>
      </div>

      {/* Deposit Summary */}
      <div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-600 dark:text-gray-300'>Deposit Amount</span>
          <span className='text-xl font-bold text-gray-900 dark:text-white'>
            ৳{data.amount?.toLocaleString()}
          </span>
        </div>

        <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-gray-900 dark:text-white'>Total Amount</span>
            <span className='text-xl font-bold text-purple-600 dark:text-purple-400'>
              ৳{data.amount?.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className='border border-gray-200 dark:border-gray-600 rounded-xl p-4'>
        <div className='flex items-center space-x-4'>
          <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center'>
            <span className='text-2xl'>👤</span>
          </div>
          <div className='flex-1'>
            <h3 className='font-semibold text-gray-900 dark:text-white'>{p?.data.name}</h3>
            <p className='text-sm text-gray-600 dark:text-gray-300'>{p?.data.phone}</p>
          </div>
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

      {/* Terms */}
      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <input
            type='checkbox'
            className='mt-1 w-4 h-4 text-purple-600 border-gray-300 dark:border-gray-600 rounded'
            defaultChecked
          />
          <div>
            <p className='text-xs text-blue-700 dark:text-blue-300'>
              I confirm that the deposit details are correct and I authorize
              this transaction. I understand that this action cannot be undone.
            </p>
          </div>
        </div>
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
          onClick={handleConfirm}
          disabled={isProcessing || pin.length < 6}
          className='flex-1 bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50'
        >
          {isProcessing ? (
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Confirm Deposit'
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
