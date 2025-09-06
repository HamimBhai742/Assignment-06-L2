import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';
import { useFindUserQuery } from '../../../../../redux/api/userApi';
import type { UserSearchProps } from '../intefaces';

const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect }) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: user,
    error,
    refetch,
  } = useFindUserQuery(searchPhone, {
    skip: searchPhone.length < 11,
  });

  useEffect(() => {
    if (user?.data) {
      setIsOpen(true);
    }
    if (error) {
      setIsOpen(false);
    }
  }, [user, error]);

  const handleSearch = () => {
    if (searchPhone.length < 11) return;
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

  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Find Customer
        </h2>
        <p className='text-gray-600 text-sm'>
          Enter customer's phone number to search
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
            className='w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg'
            maxLength={11}
          />
          <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
        </div>
        <button
          onClick={handleSearch}
          disabled={searchPhone.length < 11 || isSearching}
          className='w-full mt-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white py-3 rounded-lg font-medium transition-colors'
        >
          {isSearching ? 'Searching...' : 'Search Customer'}
        </button>
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className='space-y-3'>
          <h3 className='font-medium text-gray-900'>Search Results</h3>
          <div
            onClick={() => onUserSelect(user?.data)}
            className='p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center'>
                  <UserIcon className='h-6 w-6 text-gray-600' />
                </div>
                <div>
                  <div className='flex items-center space-x-2'>
                    <h4 className='font-medium text-gray-900'>
                      {user?.data?.user?.name}
                    </h4>
                    {user?.data?.user?.isActive && (
                      <CheckCircleIcon className='h-4 w-4 text-green-500' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600'>
                    {user?.data?.user.phone}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Balance: ৳{user?.data?.wallet?.balance?.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className='text-blue-500 font-medium'>Select</div>
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

export default UserSearch;
