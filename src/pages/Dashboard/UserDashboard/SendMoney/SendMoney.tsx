import { useState } from 'react';
import RecipientStep from './components/RecipientStep';
import AmountStep from './components/AmountStep';
import ConfirmationStep from './components/ConfirmationStep';
import { useMyWalletQuery } from '../../../../redux/api/walletApi';
import type { SendMoneyData } from './interfaces';

const SendMoney = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [sendData, setSendData] = useState<SendMoneyData>({
    recipientPhone: '',
    recipientName: '',
    recipientVerified: false,
    amount: 0,
    purpose: '',
    reference: '',
    pin: '',
  });

  const { data } = useMyWalletQuery(undefined);

  const userBalance = data?.data?.balance; // Mock user balance

  const steps = [
    { number: 1, title: 'Recipient', icon: '👤' },
    { number: 2, title: 'Amount', icon: '💰' },
    // { number: 3, title: 'Purpose', icon: '📝' },
    { number: 3, title: 'Confirm', icon: '✅' },
  ];

  const updateSendData = (data: Partial<SendMoneyData>) => {
    setSendData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className='max-w-2xl mx-auto dark:bg-gray-900'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>Send Money</h1>
        <p className='text-gray-600 dark:text-gray-400'>Transfer money to any PayWallet user</p>

        {/* Balance Display */}
        <div className='mt-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-600 dark:to-purple-700 rounded-xl text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-blue-100 dark:text-blue-200 text-sm'>Available Balance</p>
              <p className='text-2xl font-bold'>
                ৳{userBalance?.toLocaleString()}
              </p>
            </div>
            <div className='w-12 h-12 bg-white/20 dark:bg-white/10 rounded-xl flex items-center justify-center'>
              <span className='text-2xl'>💰</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          {steps.map((step, index) => (
            <div key={step.number} className='flex items-center'>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                  currentStep >= step.number
                    ? 'bg-blue-600 dark:bg-blue-700 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600 dark:bg-blue-700' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className='flex justify-between mt-2'>
          {steps.map((step) => (
            <span
              key={step.number}
              className='text-xs text-gray-500 dark:text-gray-400 text-center'
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
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
