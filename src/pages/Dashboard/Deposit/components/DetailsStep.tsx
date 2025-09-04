import { useState } from 'react';
import type { DepositData } from '../Deposit';

interface DetailsStepProps {
  data: DepositData;
  updateData: (data: Partial<DepositData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DetailsStep = ({ data, updateData, onNext, onPrev }: DetailsStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};

    if (data.method === 'bank') {
      if (!data.bankAccount) {
        newErrors.bankAccount = 'Bank account number is required';
      } else if (!/^\d{10,20}$/.test(data.bankAccount)) {
        newErrors.bankAccount = 'Invalid bank account number';
      }
    }

    if (data.method === 'card') {
      if (!data.cardNumber) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(data.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Invalid card number';
      }
    }

    if (data.method === 'mobile') {
      if (!data.mobileNumber) {
        newErrors.mobileNumber = 'Mobile number is required';
      } else if (!/^01[3-9]\d{8}$/.test(data.mobileNumber)) {
        newErrors.mobileNumber = 'Invalid mobile number';
      }
    }

    if (!data.pin) {
      newErrors.pin = 'PIN is required';
    } else if (!/^\d{4}$/.test(data.pin)) {
      newErrors.pin = 'PIN must be 4 digits';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">📝</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600 text-sm">
          Enter your {data.method === 'bank' ? 'bank account' : data.method === 'card' ? 'card' : 'mobile banking'} details
        </p>
      </div>

      <div className="space-y-4">
        {/* Bank Account Details */}
        {data.method === 'bank' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Account Number
            </label>
            <input
              type="text"
              value={data.bankAccount || ''}
              onChange={(e) => updateData({ bankAccount: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your bank account number"
            />
            {errors.bankAccount && (
              <p className="text-red-500 text-xs mt-1">{errors.bankAccount}</p>
            )}

            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-700">
                <strong>Supported Banks:</strong> DBBL, BRAC, City Bank, EBL, Dutch-Bangla, Islami Bank
              </p>
            </div>
          </div>
        )}

        {/* Card Details */}
        {data.method === 'card' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={data.cardNumber || ''}
              onChange={(e) => updateData({ cardNumber: formatCardNumber(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
            )}

            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                <strong>Accepted Cards:</strong> Visa, Mastercard (Debit & Credit)
              </p>
            </div>
          </div>
        )}

        {/* Mobile Banking Details */}
        {data.method === 'mobile' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={data.mobileNumber || ''}
              onChange={(e) => updateData({ mobileNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="01XXXXXXXXX"
            />
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
            )}

            <div className="mt-3 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700">
                <strong>Supported Services:</strong> bKash, Nagad, Rocket, Upay
              </p>
            </div>
          </div>
        )}

        {/* PIN Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Transaction PIN
          </label>
          <input
            type="password"
            value={data.pin}
            onChange={(e) => updateData({ pin: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your 4-digit PIN"
            maxLength={4}
          />
          {errors.pin && (
            <p className="text-red-500 text-xs mt-1">{errors.pin}</p>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-green-500 text-lg">🔒</span>
          <div>
            <h4 className="text-sm font-medium text-green-900">Secure Transaction</h4>
            <p className="text-xs text-green-700 mt-1">
              Your payment information is encrypted and secure. We never store your sensitive data.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={validateAndNext}
          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DetailsStep;
