import { useState } from 'react';
import AmountStep from './components/AmountStep';
import PaymentMethodStep from './components/PaymentMethodStep';
import DetailsStep from './components/DetailsStep';
import ConfirmationStep from './components/ConfirmationStep';

export interface DepositData {
  amount: number;
  method: 'bank' | 'card' | 'mobile' | '';
  bankAccount?: string;
  cardNumber?: string;
  mobileNumber?: string;
  pin: string;
}

const Deposit = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [depositData, setDepositData] = useState<DepositData>({
    amount: 0,
    method: '',
    pin: ''
  });

  const steps = [
    { number: 1, title: 'Amount', icon: '💰' },
    { number: 2, title: 'Method', icon: '💳' },
    { number: 3, title: 'Details', icon: '📝' },
    { number: 4, title: 'Confirm', icon: '✅' }
  ];

  const updateDepositData = (data: Partial<DepositData>) => {
    setDepositData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Deposit Money</h1>
        <p className="text-gray-600">Add funds to your PayWallet account</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium ${
                currentStep >= step.number
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-1 mx-4 ${
                  currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'
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
          <AmountStep
            data={depositData}
            updateData={updateDepositData}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 2 && (
          <PaymentMethodStep
            data={depositData}
            updateData={updateDepositData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <DetailsStep
            data={depositData}
            updateData={updateDepositData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        
        {currentStep === 4 && (
          <ConfirmationStep
            data={depositData}
            onPrev={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default Deposit;
