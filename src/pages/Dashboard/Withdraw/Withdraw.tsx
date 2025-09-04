import { useState } from 'react';
import AmountStep from './components/AmountStep';
// import MethodStep from './components/MethodStep';
// import LocationStep from './components/LocationStep';
import ConfirmationStep from './components/ConfirmationStep';
import { useMyWalletQuery } from '../../../redux/api/walletApi';

export interface WithdrawData {
  amount: number;
  method: 'agent' | 'atm' | 'bank' | '';
  agentId?: string;
  agentName?: string;
  agentLocation?: string;
  atmId?: string;
  bankAccount?: string;
  pin: string;
}

const Withdraw = () => {
  const { data } = useMyWalletQuery(undefined);
  const [currentStep, setCurrentStep] = useState(1);
  const [withdrawData, setWithdrawData] = useState<WithdrawData>({
    amount: 0,
    method: '',
    pin: '',
  });
  console.log(data?.data?.balance);
  const userBalance = data?.data?.balance; // Mock user balance

  const steps = [
    { number: 1, title: 'Amount', icon: '💰' },
    { number: 2, title: 'Confirm', icon: '✅' },
  ];

  const updateWithdrawData = (data: Partial<WithdrawData>) => {
    setWithdrawData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className='max-w-2xl mx-auto'>
      {/* Header */}
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-gray-900 mb-2'>
          Withdraw Money
        </h1>
        <p className='text-gray-600'>Cash out from your PayWallet account</p>

        {/* Balance Display */}
        <div className='mt-4 p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-purple-100 text-sm'>Available Balance</p>
              <p className='text-2xl font-bold'>
                ৳{userBalance?.toLocaleString()}
              </p>
            </div>
            <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center'>
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
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 ${
                    currentStep > step.number ? 'bg-red-600' : 'bg-gray-200'
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
              className='text-xs text-gray-500 text-center'
            >
              {step.title}
            </span>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
        {currentStep === 1 && (
          <AmountStep
            data={withdrawData}
            updateData={updateWithdrawData}
            userBalance={userBalance}
            onNext={nextStep}
          />
        )}

        {currentStep === 2 && (
          <ConfirmationStep
            data={withdrawData}
            userBalance={userBalance}
            onPrev={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default Withdraw;
