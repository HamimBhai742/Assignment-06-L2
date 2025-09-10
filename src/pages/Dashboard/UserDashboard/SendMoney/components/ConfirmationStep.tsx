/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useMatchPINMutation } from '../../../../../redux/api/authApi';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useSendMoneyMutation } from '../../../../../redux/api/walletApi';
import type { ConfirmationStepProps, ResponseData } from '../interfaces';

const ConfirmationStep = ({
  data,
  userBalance,
  onPrev,
}: ConfirmationStepProps) => {
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [matchPIN] = useMatchPINMutation();
  const [SendMoney] = useSendMoneyMutation();
  const [response, setResponse] = useState<ResponseData | undefined>();
  const [date, setDate] = useState('');

  const getFee = () => {
    if ((data.amount || 0) >= 100) return 5;
    return 0;
  };

  const fee = getFee();
  const totalDeduction = (data.amount || 0) + fee;
  const handleConfirm = async () => {
    if (!pin || pin.length !== 6) return;
    setIsProcessing(true);
    try {
      const match = await matchPIN(pin);
      const sendData = {
        to: data.recipientPhone,
        amount: data.amount,
      };
      if (match.data) {
        const res = await SendMoney(sendData);
        if (res?.data) {
          setResponse(res as ResponseData);
          const dates = format(
            new Date(res?.data?.data?.transaction?.createdAt),
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
      toast.error('Send money failed');
    } finally {
      setIsProcessing(false);
    }
  };
  const res = response?.data as {
    data: {
      message: string;
      transaction: {
        transactionId: string;
        createdAt: string;
        fee: number;
        amount: number;
      };
      wallet: { balance: number; receiver: string; availableBalance: number };
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
            {res.data?.message}
          </h2>
          <p className='text-gray-600 dark:text-gray-300'>
            ৳{data.amount?.toLocaleString()} has been sent to{' '}
            {data.recipientName}
          </p>
        </div>

        <div className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4'>
          <div className='text-sm space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Transaction ID:</span>
              <span className='font-mono text-gray-900 dark:text-white'>
                {res?.data?.transaction?.transactionId}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Date & Time:</span>
              <span className='text-gray-900 dark:text-white'>{date && date}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Recipient:</span>
              <span className='text-gray-900 dark:text-white'>{res.data.wallet.receiver}</span>
            </div>
            {fee > 0 && (
              <div className='flex justify-between'>
                <span className='text-gray-600 dark:text-gray-300'>Fee:</span>
                <span className='text-gray-900 dark:text-white'>
                  {res.data.transaction.fee}
                </span>
              </div>
            )}
            <div className='flex justify-between'>
              <span className='text-gray-600 dark:text-gray-300'>Purpose:</span>
              <span className='text-gray-900 dark:text-white'>Send Money</span>
            </div>
          </div>
        </div>

        <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4'>
          <div className='flex items-start space-x-3'>
            <span className='text-blue-500 text-lg'>📱</span>
            <div>
              <h4 className='text-sm font-medium text-blue-900 dark:text-blue-200'>
                Notification Sent
              </h4>
              <p className='text-xs text-blue-700 dark:text-blue-300 mt-1'>
                {data.recipientName} has been notified about this transaction
                via SMS and app notification.
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all'
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => (window.location.href = '/dashboard/send')}
            className='w-full bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-4 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors'
          >
            Send Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl text-white'>✅</span>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          Confirm Transaction
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm'>
          Please review and confirm your transaction
        </p>
      </div>

      {/* Transaction Summary */}
      <div className='bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-600 dark:text-gray-300'>Recipient</span>
          <div className='text-right'>
            <p className='font-semibold text-gray-900 dark:text-white'>{data.recipientName}</p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>+880 {data.recipientPhone}</p>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-600 dark:text-gray-300'>Send Amount</span>
          <span className='text-xl font-bold text-gray-900 dark:text-white'>
            ৳{data.amount?.toLocaleString()}
          </span>
        </div>

        {fee > 0 && (
          <div className='flex items-center justify-between'>
            <span className='text-gray-600 dark:text-gray-300'>Service Fee</span>
            <span className='text-gray-900 dark:text-white'>৳{fee}</span>
          </div>
        )}

        <div className='flex items-center justify-between'>
          <span className='text-gray-600 dark:text-gray-300'>Purpose</span>
          <span className='text-gray-900 dark:text-white'>Send Money</span>
        </div>

        <div className='border-t border-gray-200 dark:border-gray-600 pt-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-gray-900 dark:text-white'>Total Deduction</span>
            <span className='text-xl font-bold text-blue-600 dark:text-blue-400'>
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

      {/* Recipient Verification Status */}
      <div
        className={`border rounded-lg p-4 ${
          data.recipientVerified
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
            : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-700'
        }`}
      >
        <div className='flex items-center space-x-3'>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              data.recipientVerified ? 'bg-green-100 dark:bg-green-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
            }`}
          >
            <span className='text-lg'>
              {data.recipientVerified ? '✅' : '⚠️'}
            </span>
          </div>
          <div className='flex-1'>
            <h3
              className={`font-medium ${
                data.recipientVerified ? 'text-green-900 dark:text-green-200' : 'text-orange-900 dark:text-orange-200'
              }`}
            >
              {data.recipientVerified
                ? 'Verified Recipient'
                : 'Unverified Recipient'}
            </h3>
            <p
              className={`text-sm ${
                data.recipientVerified ? 'text-green-700 dark:text-green-300' : 'text-orange-700 dark:text-orange-300'
              }`}
            >
              {data.recipientVerified
                ? 'This user is verified and will receive money instantly'
                : 'This user is not verified. Small service fee applies'}
            </p>
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
          className='w-full px-4 py-3 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
          placeholder='Enter your 6-digit PIN'
          maxLength={6}
        />
      </div>

      {/* Security Notice */}
      <div className='bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <span className='text-blue-500 text-lg'>🔒</span>
          <div>
            <h4 className='text-sm font-medium text-blue-900 dark:text-blue-200'>
              Secure Transaction
            </h4>
            <p className='text-xs text-blue-700 dark:text-blue-300 mt-1'>
              This transaction is protected with end-to-end encryption. Your PIN
              is never stored or shared.
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
          disabled={isProcessing || pin.length !== 6}
          className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50'
        >
          {isProcessing ? (
            <div className='flex items-center justify-center space-x-2'>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
              <span>Sending Money...</span>
            </div>
          ) : (
            'Send Money'
          )}
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
