/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useChangePinMutation } from '../../../../../redux/api/userApi';

const SecuritySettings = () => {
  const [showChangePIN, setShowChangePIN] = useState(false);
  const [changePin] = useChangePinMutation();
  const [pinForm, setPinForm] = useState({
    currentPIN: '',
    newPIN: '',
    confirmPIN: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const handlePINChange = async () => {
    if (pinForm.currentPIN === pinForm.newPIN) {
      toast.error('New PIN cannot be the same as the current PIN');
      return;
    }
    if (pinForm.newPIN !== pinForm.confirmPIN) {
      toast.error('PINs do not match');
      return;
    }
    const dataFrom = {
      currentPIN: pinForm.currentPIN,
      newPIN: pinForm.newPIN,
    };
    setIsProcessing(true);
    try {
      const res = await changePin(dataFrom);
      if (res?.data) {
        toast.success(res.data.message);
        setShowChangePIN(false);
      }
      if (res.error) {
        const err = res?.error as { data: { message: string } };
        const errSrc = res?.error as {
          data: { errorSource: { message: string }[] };
        };
        if (errSrc?.data?.errorSource.length > 0) {
          toast.error(errSrc.data.errorSource[0]?.message);
        } else {
          toast.error(err.data?.message);
        }
      }
    } catch (error) {
      alert('Failed to change PIN');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className='space-y-6'>
      <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>Security Settings</h3>

      {/* PIN Section */}
      <div className='border border-gray-200 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800'>
        <div className='flex items-center justify-between mb-4'>
          <div>
            <h4 className='font-medium text-gray-900 dark:text-white'>Transaction PIN</h4>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              Used for transaction verification
            </p>
          </div>
          <button
            onClick={() => setShowChangePIN(!showChangePIN)}
            className='px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-800 transition-colors'
          >
            {showChangePIN ? 'Cancel' : 'Change PIN'}
          </button>
        </div>

        {showChangePIN && (
          <div className='space-y-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                Current PIN
              </label>
              <input
                type='password'
                value={pinForm.currentPIN}
                onChange={(e) =>
                  setPinForm((prev) => ({
                    ...prev,
                    currentPIN: e.target.value,
                  }))
                }
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                placeholder='Enter current PIN'
                maxLength={6}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                New PIN
              </label>
              <input
                type='password'
                value={pinForm.newPIN}
                onChange={(e) =>
                  setPinForm((prev) => ({ ...prev, newPIN: e.target.value }))
                }
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                placeholder='Enter new 6-digit PIN'
                maxLength={6}
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2'>
                Confirm New PIN
              </label>
              <input
                type='password'
                value={pinForm.confirmPIN}
                onChange={(e) =>
                  setPinForm((prev) => ({
                    ...prev,
                    confirmPIN: e.target.value,
                  }))
                }
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                placeholder='Confirm new PIN'
                maxLength={6}
              />
            </div>

            <button
              onClick={handlePINChange}
              disabled={
                isProcessing ||
                !pinForm.currentPIN ||
                !pinForm.newPIN ||
                !pinForm.confirmPIN
              }
              className='w-full bg-green-600 dark:bg-green-700 text-white py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition-colors disabled:opacity-50'
            >
              {isProcessing ? 'Changing PIN...' : 'Change PIN'}
            </button>
          </div>
        )}
      </div>

      {/* Security Tips */}
      <div className='bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4'>
        <div className='flex items-start space-x-3'>
          <span className='text-yellow-500 text-lg'>💡</span>
          <div>
            <h4 className='text-sm font-medium text-yellow-900 dark:text-yellow-200'>
              Security Tips
            </h4>
            <ul className='text-xs text-yellow-700 dark:text-yellow-300 mt-1 space-y-1 list-disc'>
              <li> Use a strong, unique password for your account</li>
              <li> Never share your PIN with anyone</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
