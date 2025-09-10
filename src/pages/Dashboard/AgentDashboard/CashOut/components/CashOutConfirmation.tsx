/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  CheckCircleIcon,
  ArrowPathIcon,
  UserIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useCashOutMutation } from '../../../../../redux/api/walletApi';
import toast from 'react-hot-toast';
import type { CashOutConfirmationProps } from '../interface';
import type { ResponseData } from '../../CashIn/intefaces';



const CashOutConfirmation: React.FC<CashOutConfirmationProps> = ({
  user,
  transactionData,
  onReset,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const remainingBalance = user.balance - transactionData.totalDeduction;
  const [cashOut] = useCashOutMutation();
  const [res, setRes] = useState<ResponseData | undefined>();
  const [isSuccess, setIsSuccess] = useState(false);
  const handleConfirmTransaction = async () => {
    setIsProcessing(true);
    try {
      const sendData = {
        to: user.phone,
        amount: transactionData.amount,
      };
      const res = await cashOut(sendData);
      if (res.data) {
        setRes(res.data);
        setIsSuccess(true);
      }
      if (res.error) {
        const err = res.error as { data: { message: string } };
        toast.error(err.data.message);
      }
    } catch (error) {
      toast.error('Cash out failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  if (isSuccess) {
    return (
      <div className='p-6 text-center'>
        <div className='w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CheckCircleIcon className='h-10 w-10 text-green-500 dark:text-green-400' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          {res?.message}
        </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Money has been withdrawn from customer's account
        </p>

        <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 mb-6'>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Transaction ID:</span>
              <span className='font-mono font-medium text-gray-900 dark:text-white'>{res?.data.trnxId}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Customer:</span>
              <span className='font-medium text-gray-900 dark:text-white'>{user.name}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Phone:</span>
              <span className='font-medium text-gray-900 dark:text-white'>{user.phone}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Amount Withdrawn:</span>
              <span className='font-bold text-red-600 dark:text-red-400'>
                ৳{transactionData.amount.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Service Charge:</span>
              <span className='font-medium text-gray-900 dark:text-white'>
                ৳{transactionData.charge.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Agent Commission:</span>
              <span className='font-medium text-gray-900 dark:text-white'>
                ৳{res?.data.commission.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between border-t border-green-200 dark:border-green-600 pt-2'>
              <span className='text-gray-600 dark:text-gray-300'>Total Deducted:</span>
              <span className='font-bold text-gray-900 dark:text-white'>
                ৳{transactionData.totalDeduction.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Customer's New Balance:</span>
              <span
                className={`font-bold ${
                  remainingBalance < 100 ? 'text-yellow-600 dark:text-yellow-400' : 'text-blue-600 dark:text-blue-400'
                }`}
              >
                ৳{remainingBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {remainingBalance < 100 && (
          <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-4'>
            <div className='flex items-center justify-center space-x-2 text-yellow-700 dark:text-yellow-300'>
              <ExclamationTriangleIcon className='h-5 w-5' />
              <span className='text-sm font-medium'>
                Customer has low balance remaining
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onReset}
          className='w-full bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors'
        >
          Make Another Transaction
        </button>
      </div>
    );
  }
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          Confirm Cash Out
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm'>
          Please review the details before confirming withdrawal
        </p>
      </div>

      {/* Customer Info */}
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
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Current Balance: ৳{user.balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className='bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6'>
        <h3 className='font-medium text-gray-900 dark:text-white mb-3'>Transaction Details</h3>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-600 dark:text-gray-300'>Withdrawal Amount:</span>
            <span className='font-medium text-gray-900 dark:text-white'>
              ৳{transactionData.amount.toLocaleString()}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600 dark:text-gray-300'>Service Charge:</span>
            <span className='font-medium text-gray-900 dark:text-white'>
              ৳{transactionData.charge.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between border-t border-gray-200 dark:border-gray-600 pt-2'>
            <span className='font-medium text-gray-900 dark:text-white'>Total Deduction:</span>
            <span className='font-bold text-lg text-red-600 dark:text-red-400'>
              ৳{transactionData.totalDeduction.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600 dark:text-gray-300'>Customer's New Balance:</span>
            <span
              className={`font-bold ${
                remainingBalance < 100 ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
              }`}
            >
              ৳{remainingBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Low Balance Warning */}
      {remainingBalance < 100 && (
        <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mb-6'>
          <div className='flex items-center space-x-2 text-yellow-700 dark:text-yellow-300'>
            <ExclamationTriangleIcon className='h-5 w-5' />
            <span className='text-sm font-medium'>
              Warning: Customer will have low balance after this transaction
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className='space-y-3'>
        <button
          onClick={handleConfirmTransaction}
          disabled={isProcessing}
          className='w-full bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-3 rounded-lg font-medium text-lg transition-colors flex items-center justify-center'
        >
          {isProcessing ? (
            <>
              <ArrowPathIcon className='h-5 w-5 mr-2 animate-spin' />
              Processing Cash Out...
            </>
          ) : (
            'Confirm Cash Out'
          )}
        </button>
        <button
          onClick={onReset}
          disabled={isProcessing}
          className='w-full bg-gray-500 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CashOutConfirmation;
