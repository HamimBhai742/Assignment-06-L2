/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import UserSearch, { type SelectUser } from './components/UserSearch';
import TransactionForm from './components/TransactionForm';
import TransactionConfirmation from './components/TransactionConfirmation';
import { useMyWalletQuery } from '../../../../redux/api/walletApi';
import toast from 'react-hot-toast';

type Step = 'search' | 'form' | 'confirmation';

interface SelectedUser {
  id: string;
  name: string;
  phone: string;
  balance: number;
  verified: boolean;
  myBalance: number;
}

const CashIn: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('search');
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>();
  const [transactionData, setTransactionData] = useState<any>(null);
  const { data: myWallet } = useMyWalletQuery(undefined);
  console.log(myWallet);

  const handleUserSelect = (user: SelectUser) => {
    if (myWallet.data.status === 'blocked') {
      toast.error('Your wallet is blocked. Please contact support.');
      return;
    }
    const userData = {
      id: user.user._id,
      name: user.user.name,
      phone: user.user.phone,
      balance: user.wallet.balance,
      verified: user.user.isActive,
      myBalance: myWallet?.data.balance,
    };
    setSelectedUser(userData);
    setCurrentStep('form');
  };

  const handleTransactionSubmit = (data: any) => {
    setTransactionData(data);
    setCurrentStep('confirmation');
  };

  const handleReset = () => {
    setCurrentStep('search');
    setSelectedUser(null);
    setTransactionData(null);
  };

  return (
    <div className='p-4 md:p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-2xl mx-auto'>
        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-gray-900'>
            Cash In
          </h1>
          <p className='text-gray-600 mt-1'>Add money to customer account</p>
        </div>

        {/* Progress Steps */}
        <div className='mb-8'>
          <div className='flex items-center justify-center space-x-4'>
            {['Search User', 'Enter Amount', 'Confirm'].map((step, index) => (
              <div key={step} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 0 && currentStep === 'search'
                      ? 'bg-blue-500 text-white'
                      : index === 1 && currentStep === 'form'
                      ? 'bg-blue-500 text-white'
                      : index === 2 && currentStep === 'confirmation'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                <span className='ml-2 text-sm font-medium text-gray-700'>
                  {step}
                </span>
                {index < 2 && (
                  <div className='w-8 h-0.5 bg-gray-300 ml-4'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100'>
          {currentStep === 'search' && (
            <UserSearch onUserSelect={handleUserSelect} />
          )}
          {currentStep === 'form' && selectedUser && (
            <TransactionForm
              user={selectedUser}
              onSubmit={handleTransactionSubmit}
              onBack={() => setCurrentStep('search')}
            />
          )}
          {currentStep === 'confirmation' &&
            selectedUser &&
            transactionData && (
              <TransactionConfirmation
                user={selectedUser}
                transactionData={transactionData}
                onReset={handleReset}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default CashIn;
