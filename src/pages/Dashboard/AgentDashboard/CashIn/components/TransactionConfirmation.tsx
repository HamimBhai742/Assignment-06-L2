/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import {
  CheckCircleIcon,
  ArrowPathIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useCashInMutation } from '../../../../../redux/api/walletApi';
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
  totalAmount: number;
  pin: string;
  reference: string;
  timestamp: string;
}

export interface ResponseData {
  message: string;
  data: {
    availableBlance: number;
    phone: string;
    recipient: string;
    amount: number;
    commission: number;
    trnxId: string;
    walletStatus: string;
  };
}

interface TransactionConfirmationProps {
  user: User;
  transactionData: TransactionData;
  onReset: () => void;
}

const TransactionConfirmation: React.FC<TransactionConfirmationProps> = ({
  user,
  transactionData,
  onReset,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cashIn] = useCashInMutation();
  const [res, setRes] = useState<ResponseData | undefined>();
  const handleConfirmTransaction = async () => {
    setIsProcessing(true);
    try {
      const sendData = {
        to: user.phone,
        amount: transactionData.amount,
      };
      const res = await cashIn(sendData);
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
          Money has been added to customer's account
        </p>

        <div className='bg-green-50 border border-green-200 rounded-lg p-4 mb-6'>
          <div className='space-y-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Transaction ID:</span>
              <span className='font-mono font-medium'>{res?.data.trnxId}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Customer:</span>
              <span className='font-medium'>{res?.data.recipient}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Phone:</span>
              <span className='font-medium'>{res?.data.phone}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Amount Added:</span>
              <span className='font-bold text-green-600'>
                ৳{res?.data.amount?.toLocaleString()}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Service Charge:</span>
              <span className='font-semibold text-blue-600'>Free</span>
            </div>
            <div className='flex justify-between border-t border-green-200 pt-2'>
              <span className='text-gray-600'>Total Deducted:</span>
              <span className='font-bold'>
                ৳{res?.data?.amount?.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Agent Commission:</span>
              <span className='font-semibold text-blue-600'>
                ৳{res?.data?.commission?.toFixed(2)}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>New Balance:</span>
              <span className='font-bold text-blue-600'>
                {/* ৳{(user?.balance + transactionData?.amount)?.toLocaleString()} */}
                ৳{res?.data?.availableBlance?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors'
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
          Confirm Transaction
        </h2>
        <p className='text-gray-600 text-sm'>
          Please review the details before confirming
        </p>
      </div>

      {/* Customer Info */}
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
          </div>
        </div>
      </div>

      {/* Transaction Details */}
      <div className='bg-gray-50 rounded-lg p-4 mb-6'>
        <h3 className='font-medium text-gray-900 mb-3'>Transaction Details</h3>
        <div className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Amount to Add:</span>
            <span className='font-medium'>
              ৳{transactionData?.amount?.toLocaleString()}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Service Charge:</span>
            <span className='font-semibold text-blue-600'>Free</span>
          </div>
          <div className='flex justify-between border-t border-gray-200 pt-2'>
            <span className='font-medium text-gray-900'>Total Amount:</span>
            <span className='font-bold text-lg text-blue-600'>
              ৳{transactionData?.amount?.toLocaleString()}
            </span>
          </div>
          <div className='flex justify-between'>
            <span className='text-gray-600'>Customer's New Balance:</span>
            <span className='font-bold text-green-600'>
              ৳{(user.balance + transactionData.amount).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='space-y-3'>
        <button
          onClick={handleConfirmTransaction}
          disabled={isProcessing}
          className='w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium text-lg transition-colors flex items-center justify-center'
        >
          {isProcessing ? (
            <>
              <ArrowPathIcon className='h-5 w-5 mr-2 animate-spin' />
              Processing...
            </>
          ) : (
            'Confirm Transaction'
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

export default TransactionConfirmation;
