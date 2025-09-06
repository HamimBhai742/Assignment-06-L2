import { useState } from 'react';
import { useFindUserQuery } from '../../../../../redux/api/userApi';
import type { RecipientStepProps } from '../interfaces';


const RecipientStep = ({ data, updateData, onNext }: RecipientStepProps) => {
  const [phone, setPhone] = useState(data.recipientPhone || '');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const { data: userData } = useFindUserQuery(phone);

  const handlePhoneChange = (value: string) => {
    const cleanValue = value.replace(/\D/g, '').slice(0, 11);
    setPhone(cleanValue);
    setError('');
    searchUser(cleanValue);
  };

  const searchUser = async (phoneNumber: string) => {
    if (!/^01[3-9]\d{8}$/.test(phoneNumber)) {
      setError('Invalid Bangladesh mobile number');
      return;
    }
    setIsSearching(true);
    setError('');
    try {
      // Simulate API call
      const user = userData;
      if (user && userData.data) {
        updateData({
          recipientPhone: user.data.phone,
          recipientName: user.data.name,
          recipientVerified: true,
        });
        setIsSearching(false);
      } else {
        setError('User not found. Please check the phone number.');
        updateData({
          recipientPhone: user.data.phone,
          recipientName: '',
          recipientVerified: false,
        });
        setIsSearching(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setIsSearching(false);
      setError('Failed to search user. Please try again.');
    }
  };


  const handleNext = () => {
    if (!data.recipientPhone || data.recipientPhone.length !== 11) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!data.recipientName) {
      setError('Recipient not found');
      return;
    }

    onNext();
  };

  return (
    <div className='space-y-6'>
      <div className='text-center'>
        <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4'>
          <span className='text-2xl text-white'>👤</span>
        </div>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>
          Select Recipient
        </h2>
        <p className='text-gray-600 text-sm'>
          Enter phone number to find PayWallet user
        </p>
      </div>

      {/* Phone Number Input */}
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Recipient Phone Number
          </label>
          <div className='relative'>
            <div className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium'>
              +88
            </div>
            <input
              type='tel'
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              className='w-full pl-16 pr-12 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='1XXXXXXXXX'
            />
            {isSearching && (
              <div className='absolute right-4 top-1/2 transform -translate-y-1/2'>
                <div className='w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin'></div>
              </div>
            )}
          </div>
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {/* User Found Display */}
        {userData?.data && !error && (
          <div className='bg-green-50 border border-green-200 rounded-xl p-4'>
            <div className='flex items-center space-x-4'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center'>
                <span className='text-xl'>👤</span>
              </div>
              <div className='flex-1'>
                <div className='flex items-center space-x-2'>
                  <h3 className='font-semibold text-gray-900'>
                    {userData.data.name}
                  </h3>
                  {data.recipientVerified && (
                    <span className='bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium'>
                      ✓ Verified
                    </span>
                  )}
                </div>
                <p className='text-sm text-gray-600'>
                  +88 {userData.data.phone}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <span className='text-blue-500 text-lg'>ℹ️</span>
          <div>
            <h4 className='text-sm font-medium text-blue-900'>
              Send Money Information
            </h4>
            <ul className='text-xs text-blue-700 mt-1 space-y-1'>
              <li>• Only verified PayWallet users can receive money</li>
              <li>• Maximum ৳25,000 per transaction</li>
              <li>• No fee for sending to verified users</li>
              <li>• Instant transfer to recipient's wallet</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={!data.recipientName || isSearching}
        className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
      >
        {isSearching ? 'Searching...' : 'Continue'}
      </button>
    </div>
  );
};

export default RecipientStep;
