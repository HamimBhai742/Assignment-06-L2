import { useState } from 'react';
import type{ WithdrawData } from '../Withdraw';

interface ConfirmationStepProps {
  data: WithdrawData;
  userBalance: number;
  onPrev: () => void;
}

const ConfirmationStep = ({ data, userBalance, onPrev }: ConfirmationStepProps) => {
  const [pin, setPin] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const getFee = () => {
    if (data.method === 'agent') return 15;
    if (data.method === 'atm') return 15;
    return 0; // bank transfer is free
  };

  const fee = getFee();
  const totalDeduction = (data.amount || 0) + fee;

  const getMethodDetails = () => {
    switch (data.method) {
      case 'agent':
        return {
          title: 'Agent Point Withdrawal',
          details: data.agentName || '',
          location: data.agentLocation || '',
          icon: '🏪'
        };
      case 'atm':
        return {
          title: 'ATM Withdrawal',
          details: 'DBBL ATM',
          location: 'Dhanmondi 32, Dhaka',
          icon: '🏧'
        };
      case 'bank':
        return {
          title: 'Bank Transfer',
          details: 'DBBL - Main Account',
          location: 'Account: ****1234',
          icon: '🏦'
        };
      default:
        return { title: '', details: '', location: '', icon: '' };
    }
  };

  const handleConfirm = async () => {
    if (!pin || pin.length !== 4) return;

    setIsProcessing(true);

    try {
      // Simulate PIN verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (data.method === 'agent') {
        setShowOTP(true);
        setIsProcessing(false);
      } else {
        // For ATM and Bank, complete directly
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSuccess(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Withdrawal failed:', error);
      setIsProcessing(false);
    }
  };

  const handleOTPConfirm = async () => {
    if (!otpCode || otpCode.length !== 6) return;

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
    } catch (error) {
      console.error('OTP verification failed:', error);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Withdrawal Successful!</h2>
          <p className="text-gray-600">
            {data.method === 'agent' && `Please collect ৳${data.amount?.toLocaleString()} from ${data.agentName}`}
            {data.method === 'atm' && `৳${data.amount?.toLocaleString()} is ready for withdrawal`}
            {data.method === 'bank' && `৳${data.amount?.toLocaleString()} will be transferred to your bank account`}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Transaction ID:</span>
              <span className="font-mono text-gray-900">WTH{Date.now()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="text-gray-900">{new Date().toLocaleString()}</span>
            </div>
            {data.method === 'agent' && (
              <div className="flex justify-between">
                <span className="text-gray-600">OTP Code:</span>
                <span className="font-mono text-gray-900 font-bold">{otpCode}</span>
              </div>
            )}
          </div>
        </div>

        {data.method === 'agent' && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <span className="text-orange-500 text-lg">⚠️</span>
              <div>
                <h4 className="text-sm font-medium text-orange-900">Important Instructions</h4>
                <ul className="text-xs text-orange-700 mt-1 space-y-1">
                  <li>• Show this OTP code to the agent</li>
                  <li>• Verify agent's identity before sharing OTP</li>
                  <li>• Collect exact amount: ৳{data.amount?.toLocaleString()}</li>
                  <li>• Keep transaction receipt</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
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

  if (showOTP) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🔐</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Enter OTP Code</h2>
          <p className="text-gray-600 text-sm">Share this code with the agent to collect your cash</p>
        </div>

        {/* Generated OTP Display */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-sm text-blue-700 mb-2">Your OTP Code</p>
          <div className="text-3xl font-bold text-blue-900 font-mono tracking-wider">
            {Math.random().toString().substr(2, 6)}
          </div>
          <p className="text-xs text-blue-600 mt-2">Valid for 10 minutes</p>
        </div>

        {/* OTP Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm OTP (Enter the code above)
          </label>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
            className="w-full px-4 py-3 text-center text-xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="000000"
            maxLength={6}
          />
        </div>

        <button
          onClick={handleOTPConfirm}
          disabled={isProcessing || otpCode.length !== 6}
          className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </div>
          ) : (
            'Confirm Withdrawal'
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">✅</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Confirm Withdrawal</h2>
        <p className="text-gray-600 text-sm">Please review your withdrawal details</p>
      </div>

      {/* Withdrawal Summary */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Withdrawal Amount</span>
          <span className="text-xl font-bold text-gray-900">৳{data.amount?.toLocaleString()}</span>
        </div>

        {fee > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Service Fee</span>
            <span className="text-gray-900">৳{fee}</span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total Deduction</span>
            <span className="text-xl font-bold text-red-600">৳{totalDeduction.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Remaining Balance</span>
          <span className="text-gray-900">৳{(userBalance - totalDeduction).toLocaleString()}</span>
        </div>
      </div>

      {/* Method Details */}
      <div className="border border-gray-200 rounded-xl p-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <span className="text-xl">{methodDetails.icon}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{methodDetails.title}</h3>
            <p className="text-sm text-gray-600">{methodDetails.details}</p>
            <p className="text-xs text-gray-500">{methodDetails.location}</p>
          </div>
        </div>
      </div>

      {/* PIN Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter Transaction PIN
        </label>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          className="w-full px-4 py-3 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          placeholder="Enter your 4-digit PIN"
          maxLength={4}
        />
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
          disabled={isProcessing || pin.length !== 4}
          className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
