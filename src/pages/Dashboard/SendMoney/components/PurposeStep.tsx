import { useState } from 'react';
import type{ SendMoneyData } from '../SendMoney';

interface PurposeStepProps {
  data: SendMoneyData;
  updateData: (data: Partial<SendMoneyData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PurposeStep = ({ data, updateData, onNext, onPrev }: PurposeStepProps) => {
  const [customPurpose, setCustomPurpose] = useState('');

  const commonPurposes = [
    { id: 'personal', label: 'Personal', icon: '👤', description: 'Family, friends, personal use' },
    { id: 'food', label: 'Food & Dining', icon: '🍽️', description: 'Restaurant, groceries, food delivery' },
    { id: 'transport', label: 'Transportation', icon: '🚗', description: 'Taxi, bus fare, fuel' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️', description: 'Online shopping, retail purchases' },
    { id: 'bills', label: 'Bills & Utilities', icon: '🧾', description: 'Electricity, gas, internet bills' },
    { id: 'education', label: 'Education', icon: '📚', description: 'Tuition, books, courses' },
    { id: 'medical', label: 'Medical', icon: '🏥', description: 'Doctor fees, medicine, treatment' },
    { id: 'business', label: 'Business', icon: '💼', description: 'Business transactions, services' },
    { id: 'gift', label: 'Gift', icon: '🎁', description: 'Birthday, celebration, gift money' },
    { id: 'other', label: 'Other', icon: '📝', description: 'Custom purpose' }
  ];

  const handlePurposeSelect = (purpose: string) => {
    updateData({ purpose });
    if (purpose !== 'other') {
      setCustomPurpose('');
    }
  };

  const handleNext = () => {
    let finalPurpose = data.purpose;
    let finalReference = data.reference;

    if (data.purpose === 'other' && customPurpose.trim()) {
      finalPurpose = customPurpose.trim();
    }

    if (!finalPurpose) {
      finalPurpose = 'Personal';
    }

    updateData({
      purpose: finalPurpose,
      reference: finalReference
    });

    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">📝</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Purpose & Reference</h2>
        <p className="text-gray-600 text-sm">Add purpose and reference for this transaction</p>
      </div>

      {/* Transaction Summary */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Sending to</p>
            <p className="font-semibold text-gray-900">{data.recipientName}</p>
            <p className="text-sm text-gray-600">+880 {data.recipientPhone}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Amount</p>
            <p className="text-2xl font-bold text-blue-600">৳{data.amount?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Purpose Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-4">Select Purpose</h3>
        <div className="grid grid-cols-2 gap-3">
          {commonPurposes.map((purpose) => (
            <button
              key={purpose.id}
              onClick={() => handlePurposeSelect(purpose.id)}
              className={`p-3 rounded-xl border-2 transition-all text-left ${
                data.purpose === purpose.id || (data.purpose === purpose.label)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{purpose.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm">{purpose.label}</h4>
                  <p className="text-xs text-gray-500 truncate">{purpose.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Purpose Input */}
      {data.purpose === 'other' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Purpose
          </label>
          <input
            type="text"
            value={customPurpose}
            onChange={(e) => setCustomPurpose(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter custom purpose"
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1">{customPurpose.length}/50 characters</p>
        </div>
      )}

      {/* Reference Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Reference (Optional)
        </label>
        <input
          type="text"
          value={data.reference}
          onChange={(e) => updateData({ reference: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Add a note or reference"
          maxLength={100}
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional message for the recipient • {data.reference.length}/100 characters
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-500 text-lg">🔒</span>
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Privacy & Security</h4>
            <p className="text-xs text-yellow-700 mt-1">
              Purpose and reference information helps with transaction tracking and is visible to both sender and recipient.
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
          onClick={handleNext}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PurposeStep;
