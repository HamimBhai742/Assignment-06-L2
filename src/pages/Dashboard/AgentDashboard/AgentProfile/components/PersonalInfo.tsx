/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import toast from 'react-hot-toast';
import { useUpdateUserMutation } from '../../../../../redux/api/userApi';
import type { PersonalInfoProps } from '../interfaces';

const PersonalInfo = ({ userProfile }: PersonalInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name,
    phone: userProfile?.phone,
  });
  const [updateUser] = useUpdateUserMutation();
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await updateUser(formData);
      if (res?.data) {
        toast.success(res.data.message);
        setIsSaving(false);
        setIsEditing(false);
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
        setIsSaving(false);
      }
      // Show success message
    } catch (error) {
      toast.error('Failed to update profile:');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name,
      phone: userProfile?.phone,
    });
    setIsEditing(false);
  };

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
          Personal Information
        </h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className='px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium'
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <div className='flex space-x-3'>
            <button
              onClick={handleCancel}
              className='px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className='px-4 py-2 bg-green-600 dark:bg-green-700 text-white rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors disabled:opacity-50'
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* First Name */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Name
          </label>
          {isEditing ? (
            <input
              type='text'
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            />
          ) : (
            <div className='px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white'>
              {userProfile?.name}
            </div>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Phone Number
          </label>
          {isEditing ? (
            <input
              type='text'
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            />
          ) : (
            <div className='px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white'>
              {userProfile?.phone}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
