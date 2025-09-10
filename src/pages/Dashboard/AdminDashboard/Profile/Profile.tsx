import { useState } from 'react';
import PersonalInfo from './components/PersonalInfo';
import SecuritySettings from './components/SecuritySettings';
import { useMyProfileQuery } from '../../../../redux/api/userApi';
import Loding from '../../../../components/Loding/Loding';

export interface UserProfile {
  _id?: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const { data: userProfile, isLoading } = useMyProfileQuery(undefined);

  if (isLoading) {
    return <Loding/>
  }
  const tabs = [
    { id: 'personal', name: 'Personal Info', icon: '👤' },
    { id: 'security', name: 'Security', icon: '🔒' },
   ];

  return (
    <div className='space-y-6 dark:bg-gray-900'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Profile Settings</h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            Manage your account information and preferences
          </p>
        </div>

        <div className='mt-4 sm:mt-0'>
          <div className='flex items-center space-x-2 text-sm'>
            <span
              className={`px-3 py-1 rounded-full font-medium ${
                userProfile?.data?.isActive
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
              }`}
            >
              {userProfile?.data?.isActive
                ? '✅ Verified'
                : '⏳ Pending Verification'}
            </span>
            <span className='px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-medium capitalize'>
              {userProfile?.data?.status} Level
            </span>
          </div>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className='bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white'>
        <div className='flex items-center space-x-6'>
          <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center'>
            <span className='text-3xl'>👤</span>
          </div>

          <div className='flex-1'>
            <h2 className='text-2xl font-bold'>{userProfile?.data?.name} </h2>
            {/* <p className='text-blue-100 mb-2'>

            </p> */}
            <div className='flex items-center space-x-4 text-sm mt-2 text-blue-100'>
              <span>📱 {userProfile?.data?.phone}</span>
              <span>
                📅 Joined{' '}
                {new Date(userProfile?.data?.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button className='px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors'>
            📷 Change Photo
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden'>
        <div className='border-b border-gray-200 dark:border-gray-600'>
          <nav className='flex space-x-8 px-6'>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <span className='mr-2'>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className='p-6'>
          {activeTab === 'personal' && (
            <PersonalInfo userProfile={userProfile?.data} />
          )}
          {activeTab === 'security' && <SecuritySettings />}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
