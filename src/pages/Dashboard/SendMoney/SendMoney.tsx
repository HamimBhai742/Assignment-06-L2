import { useState } from 'react';
import RecipientStep from './components/RecipientStep';
import AmountStep from './components/AmountStep';
import PurposeStep from './components/PurposeStep';
import ConfirmationStep from './components/ConfirmationStep';

export interface SendMoneyData {
  recipientPhone: string;
  recipientName: string;
  recipientVerified: boolean;
  amount: number;
  purpose: string;
  reference: string;
  pin: string;
}

const SendMoney = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sendData, setSendData] = useState<SendMoneyData>({
    recipientPhone: '',
    recipientName: '',
    recipientVerified: false,
    amount: 0,
    purpose: '',
    reference: '',
    pin: ''
  });

  const userBalance = 25750; // Mock user balance

  const steps = [
    { number: 1, title: 'Recipient', icon: '👤' },
    { number: 2, title: 'Amount', icon: '💰' },
    { number: 3, title: 'Purpose', icon: '📝' },
    { number: 4, title: 'Confirm', icon: '✅' }
  ];

  const updateSendData = (data: Partial<SendMoneyData>) => {
    setSendData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Send Money</h1>
        <p className="text-gray-600">Transfer money to any PayWallet user</p>
        
        {/* Balance Display */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Available Balance</p>
              <p className="text-2xl font-bold">৳{userBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {steps.map((step) => (
            <span key={step.number} className="text-xs text-gray-500 text-center">
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {currentStep === 1 && (
          <RecipientStep
            data={sendData}
            updateData={updateSendData}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 2 && (
          <AmountStep
            data={sendData}
            updateData={updateSendData}
            userBalance={userBalance}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <PurposeStep
            data={sendData}
            updateData={updateSendData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 4 && (
          <ConfirmationStep
            data={sendData}
            userBalance={userBalance}
            onPrev={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default SendMoney;
