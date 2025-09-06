import React, { useState } from 'react';
import {
  CheckCircleIcon,
  ArrowPathIcon,
  UserIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import type { ResponseData } from '../../CashIn/components/TransactionConfirmation';
import { useCashOutMutation } from '../../../../../redux/api/walletApi';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  verified: boolean;
}

interface TransactionData {
  amount: number;
  charge: number;
  totalDeduction: number;
  customerPin: string;
  agentPin: string;
  reference: string;
  timestamp: string;
}

interface CashOutConfirmationProps {
  user: User;
  transactionData: TransactionData;
  onReset: () => void;
}

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
      console.log(sendData);
      const res = await cashOut(sendData);
      if (res.data) {
        console.log(res.data);
        setRes(res.data);
        setIsSuccess(true);
      }
      if (res.error) {
        console.log(res.error);
        const err = res.error as { data: { message: string } };
        toast.error(err.data.message);
      }
    } catch (error) {
      toast.error('Cash out failed. Please try again.');
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };
  console.log(res);
  if (isSuccess) {
    return (
      <div className='p-6 text-center'>
        <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CheckCircleIcon className='h-10 w-10 text-green-500' />
        </div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>
          {res?.message}
        </h2>
        <p className='text-gray-600 mb-6'>
          Money has been withdrawn from customer's account
        </p>

        <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Transaction ID:</span>
              <span className='font-mono font-medium'>{res?.data.trnxId}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Customer:</span>
              <span className='font-medium'>{user.name}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Phone:</span>
              <span className='font-medium'>{user.phone}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Amount Withdrawn:</span>
              <span className='font-bold text-red-600'>
                ৳{transactionData.amount.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Service Charge:</span>
              <span className='font-medium'>
                ৳{transactionData.charge.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Agent Commission:</span>
              <span className='font-medium'>
                ৳{res?.data.commission.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between border-t border-green-200 pt-2'>
              <span className='text-gray-600'>Total Deducted:</span>
              <span className='font-bold'>
                ৳{transactionData.totalDeduction.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Customer's New Balance:</span>
              <span
                className={`font-bold ${
                  remainingBalance < 100 ? 'text-yellow-600' : 'text-blue-600'
                }`}
              >
                ৳{remainingBalance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {remainingBalance < 100 && (
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4'>
            <div className='flex items-center justify-center space-x-2 text-yellow-700'>
              <ExclamationTriangleIcon className='h-5 w-5' />
              <span className='text-sm font-medium'>
                Customer has low balance remaining
              </span>
            </div>
          </div>
        )}

        <button
          onClick={onReset}
          className='w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors'
        >
          Make Another Transaction
        </button>
      </div>
    );
  }
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Confirm Cash Out
        </h2>
        <p className='text-gray-600 text-sm'>
          Please review the details before confirming withdrawal
        </p>
      </div>

      {/* Customer Info */}
      <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
        <div className='flex items-center space-x-3'>
          <div className='w-12 h-12 bg-red-100 rounded-full flex items-center justify-center'>
            <UserIcon className='h-6 w-6 text-red-600' />
          </div>
          <div>
            <div className='flex items-center space-x-2'>
              <h3 className='font-medium text-gray-900'>{user.name}</h3>
              <CheckCircleIcon className='h-4 w-4 text-green-500' />
            </div>
            <p className='text-sm text-gray-600'>{user.phone}</p>
            <p className='text-sm text-gray-500'>
              Current Balance: ৳{user.balance.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className='bg-gray-50 rounded-lg p-4 mb-6'>
        <h3 className='font-medium text-gray-900 mb-3'>Transaction Details</h3>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Withdrawal Amount:</span>
            <span className='font-medium'>
              ৳{transactionData.amount.toLocaleString()}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Service Charge:</span>
            <span className='font-medium'>
              ৳{transactionData.charge.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between border-t border-gray-200 pt-2'>
            <span className='font-medium text-gray-900'>Total Deduction:</span>
            <span className='font-bold text-lg text-red-600'>
              ৳{transactionData.totalDeduction.toFixed(2)}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Customer's New Balance:</span>
            <span
              className={`font-bold ${
                remainingBalance < 100 ? 'text-yellow-600' : 'text-green-600'
              }`}
            >
              ৳{remainingBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Low Balance Warning */}
      {remainingBalance < 100 && (
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6'>
          <div className='flex items-center space-x-2 text-yellow-700'>
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
          className='w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium text-lg transition-colors flex items-center justify-center'
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
          className='w-full bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CashOutConfirmation;
