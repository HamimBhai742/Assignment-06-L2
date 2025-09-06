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

  console.log(res);
  if (isSuccess) {
    return (
      <div className='text-center space-y-6'>
        <div className='w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto'>
          <span className='text-3xl text-white'>✅</span>
        </div>

        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            {res.data?.message}
          </h2>
          <p className='text-gray-600'>
            ৳{data.amount?.toLocaleString()} has been sent to{' '}
            {data.recipientName}
          </p>
        </div>

        <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
          <div className='text-sm space-y-2'>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Transaction ID:</span>
              <span className='font-mono text-gray-900'>
                {res?.data?.transaction?.transactionId}
              </span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Date & Time:</span>
              <span className='text-gray-900'>{date && date}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-gray-600'>Recipient:</span>
              <span className='text-gray-900'>{res.data.wallet.receiver}</span>
            </div>
            {fee > 0 && (
              <div className='flex justify-between'>
                <span className='text-gray-600'>Fee:</span>
                <span className='text-gray-900'>
                  {res.data.transaction.fee}
                </span>
              </div>
            )}
            <div className='flex justify-between'>
              <span className='text-gray-600'>Purpose:</span>
              <span className='text-gray-900'>Send Money</span>
            </div>
          </div>
        </div>

        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
          <div className='flex items-start space-x-3'>
            <span className='text-blue-500 text-lg'>📱</span>
            <div>
              <h4 className='text-sm font-medium text-blue-900'>
                Notification Sent
              </h4>
              <p className='text-xs text-blue-700 mt-1'>
                {data.recipientName} has been notified about this transaction
                via SMS and app notification.
              </p>
            </div>
          </div>
        </div>

        <div className='space-y-3'>
          <button
            onClick={() => (window.location.href = '/dashboard')}
            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all'
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => (window.location.href = '/dashboard/send')}
            className='w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors'
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
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Confirm Transaction
        </h2>
        <p className='text-gray-600 text-sm'>
          Please review and confirm your transaction
        </p>
      </div>

      {/* Transaction Summary */}
      <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-600'>Recipient</span>
          <div className='text-right'>
            <p className='font-semibold text-gray-900'>{data.recipientName}</p>
            <p className='text-sm text-gray-600'>+880 {data.recipientPhone}</p>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <span className='text-gray-600'>Send Amount</span>
          <span className='text-xl font-bold text-gray-900'>
            ৳{data.amount?.toLocaleString()}
          </span>
        </div>

        {fee > 0 && (
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Service Fee</span>
            <span className='text-gray-900'>৳{fee}</span>
          </div>
        )}

        <div className='flex items-center justify-between'>
          <span className='text-gray-600'>Purpose</span>
          <span className='text-gray-900'>Send Money</span>
        </div>

        <div className='border-t border-gray-200 pt-4'>
          <div className='flex items-center justify-between'>
            <span className='font-semibold text-gray-900'>Total Deduction</span>
            <span className='text-xl font-bold text-blue-600'>
              ৳{totalDeduction.toLocaleString()}
            </span>
          </div>
        </div>

        <div className='flex items-center justify-between text-sm'>
          <span className='text-gray-600'>Remaining Balance</span>
          <span className='text-gray-900'>
            ৳{(userBalance - totalDeduction).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Recipient Verification Status */}
      <div
        className={`border rounded-lg p-4 ${
          data.recipientVerified
            ? 'bg-green-50 border-green-200'
            : 'bg-orange-50 border-orange-200'
        }`}
      >
        <div className='flex items-center space-x-3'>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              data.recipientVerified ? 'bg-green-100' : 'bg-orange-100'
            }`}
          >
            <span className='text-lg'>
              {data.recipientVerified ? '✅' : '⚠️'}
            </span>
          </div>
          <div className='flex-1'>
            <h3
              className={`font-medium ${
                data.recipientVerified ? 'text-green-900' : 'text-orange-900'
              }`}
            >
              {data.recipientVerified
                ? 'Verified Recipient'
                : 'Unverified Recipient'}
            </h3>
            <p
              className={`text-sm ${
                data.recipientVerified ? 'text-green-700' : 'text-orange-700'
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
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          Enter Transaction PIN
        </label>
        <input
          type='password'
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className='w-full px-4 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          placeholder='Enter your 6-digit PIN'
          maxLength={6}
        />
      </div>

      {/* Security Notice */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <span className='text-blue-500 text-lg'>🔒</span>
          <div>
            <h4 className='text-sm font-medium text-blue-900'>
              Secure Transaction
            </h4>
            <p className='text-xs text-blue-700 mt-1'>
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
          className='flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50'
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={isProcessing || pin.length !== 6}
          className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50'
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
