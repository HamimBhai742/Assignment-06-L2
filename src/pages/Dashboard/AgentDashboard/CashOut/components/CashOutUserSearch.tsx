import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useFindUserQuery } from '../../../../../redux/api/userApi';

export interface SelectUser {
  user: {
    _id: string;
    name: string;
    phone: string;
    isActive: boolean;
  };
  wallet: {
    balance: number;
  };
}

interface CashOutUserSearchProps {
  onUserSelect: (user: SelectUser) => void;
}

const CashOutUserSearch: React.FC<CashOutUserSearchProps> = ({
  onUserSelect,
}) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch, error } = useFindUserQuery(searchPhone, {
    skip: searchPhone.length < 11,
  });

  useEffect(() => {
    if (data?.data) {
      setIsOpen(true);
    }
    if (error) {
      setIsOpen(false);
    }
  }, [data, error]);

  const handleSearch = () => {
    if (searchPhone.length < 11) return;
    console.log(data);
    refetch();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getBalanceStatus = (balance: number) => {
    if (balance < 50)
      return { color: 'text-red-600', bg: 'bg-red-50', status: 'Very Low' };
    if (balance < 500)
      return { color: 'text-yellow-600', bg: 'bg-yellow-50', status: 'Low' };
    return { color: 'text-green-600', bg: 'bg-green-50', status: 'Good' };
  };
  const balanceStatus = getBalanceStatus(data?.data?.wallet.balance);
  const canWithdraw =
    data?.data?.wallet.balance >= 50 && data?.data.user.isActive;
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Find Customer
        </h2>
        <p className='text-gray-600 text-sm'>
          Enter customer's phone number to check balance
        </p>
      </div>

      {/* Search Input */}
      <div className='mb-6'>
        <div className='relative'>
          <input
            type='tel'
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Enter phone number (e.g., 01712345678)'
            className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg'
            maxLength={11}
          />
          <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
        </div>
        <button
          onClick={handleSearch}
          disabled={searchPhone.length < 11 || isSearching}
          className='w-full mt-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors'
        >
          {isSearching ? 'Searching...' : 'Search Customer'}
        </button>
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className='space-y-3'>
          <h3 className='font-medium text-gray-900'>Search Results</h3>
          <div
            onClick={() => canWithdraw && onUserSelect(data?.data)}
            className={`p-4 border rounded-lg transition-colors ${
              canWithdraw
                ? 'border-gray-200 hover:border-red-300 hover:bg-red-50 cursor-pointer'
                : 'border-red-200 bg-red-50 cursor-not-allowed opacity-75'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center'>
                  <UserIcon className='h-6 w-6 text-gray-600' />
                </div>
                <div>
                  <div className='flex items-center space-x-2'>
                    <h4 className='font-medium text-gray-900'>
                      {data?.data?.user.name}
                    </h4>
                    {data?.data?.user.isActive ? (
                      <CheckCircleIcon className='h-4 w-4 text-green-500' />
                    ) : (
                      <ExclamationTriangleIcon className='h-4 w-4 text-yellow-500' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    {data?.data?.user.phone}
                  </p>
                  <div className='flex items-center space-x-2 mt-1'>
                    <p className='text-sm font-medium'>
                      Balance: ৳{data?.data?.wallet.balance.toLocaleString()}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${balanceStatus.color} ${balanceStatus.bg}`}
                    >
                      {balanceStatus.status}
                    </span>
                  </div>
                  {!data?.data?.user.isActive && (
                    <p className='text-xs text-red-600 mt-1'>
                      Account not verified
                    </p>
                  )}
                  {data?.data?.wallet.balance < 50 && (
                    <p className='text-xs text-red-600 mt-1'>
                      Insufficient balance for withdrawal
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`font-medium ${
                  canWithdraw ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                {canWithdraw ? 'Select' : 'Cannot Withdraw'}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className='text-center py-8'>
          <UserIcon className='h-12 w-12 text-gray-300 mx-auto mb-3' />
          <p className='text-gray-500'>
            No customer found with this phone number
          </p>
        </div>
      )}
    </div>
  );
};

export default CashOutUserSearch;
