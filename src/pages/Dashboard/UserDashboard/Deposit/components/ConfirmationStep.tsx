import { useState } from 'react';
import type{ DepositData } from '../Deposit';

interface ConfirmationStepProps {
  data: DepositData;
  onPrev: () => void;
}

const ConfirmationStep = ({ data, onPrev }: ConfirmationStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const fee = data.method === 'card' ? Math.ceil((data.amount || 0) * 0.015) : 0;
  const totalAmount = (data.amount || 0) + fee;

  const getMethodDetails = () => {
    switch (data.method) {
      case 'bank':
        return {
          title: 'Bank Transfer',
          details: `Account: ****${data.bankAccount?.slice(-4)}`,
          icon: '🏦'
        };
      case 'card':
        return {
          title: 'Debit/Credit Card',
          details: `Card: ****${data.cardNumber?.replace(/\s/g, '').slice(-4)}`,
          icon: '💳'
        };
      case 'mobile':
        return {
          title: 'Mobile Banking',
          details: `Mobile: ${data.mobileNumber?.slice(0, 3)}****${data.mobileNumber?.slice(-2)}`,
          icon: '📱'
        };
      default:
        return { title: '', details: '', icon: '' };
    }
  };

  const handleConfirm = async () => {
    setIsProcessing(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setIsSuccess(true);
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const methodDetails = getMethodDetails();

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <span className="text-3xl text-white">✅</span>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deposit Successful!</h2>
          <p className="text-gray-600">৳{data.amount?.toLocaleString()} has been added to your account</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-gray-900">TXN{Date.now()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="text-gray-900">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/transactions'}
            className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
          >
            View Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">✅</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirm Deposit</h2>
        <p className="text-gray-600 text-sm">Please review your deposit details</p>
      </div>

      {/* Deposit Summary */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Deposit Amount</span>
          <span className="text-xl font-bold text-gray-900">৳{data.amount?.toLocaleString()}</span>
        </div>

        {fee > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Processing Fee</span>
            <span className="text-gray-900">৳{fee}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total Amount</span>
            <span className="text-xl font-bold text-purple-600">৳{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">{methodDetails.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{methodDetails.title}</h3>
            <p className="text-sm text-gray-600">{methodDetails.details}</p>
          </div>
        </div>
      </div>

      {/* Terms */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <input type="checkbox" className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded" defaultChecked />
          <div>
            <p className="text-xs text-blue-700">
              I confirm that the deposit details are correct and I authorize this transaction.
              I understand that this action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onPrev}
          disabled={isProcessing}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleConfirm}
          disabled={isProcessing}
          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
