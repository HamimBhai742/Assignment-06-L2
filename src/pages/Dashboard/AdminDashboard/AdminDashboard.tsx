import { useState } from 'react';
import Overview from './Overview/Overview';
import ManageUsers from './ManageUsers/ManageUsers';
import { 
  ChartBarIcon, 
  UsersIcon, 
  UserGroupIcon, 
  CogIcon 
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'users', label: 'Manage Users', icon: UsersIcon },
    { id: 'agents', label: 'Manage Agents', icon: UserGroupIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      case 'users':
        return <ManageUsers />;
      case 'agents':
        return <div className="text-center py-12 text-gray-500">Manage Agents - Coming Soon</div>;
      case 'settings':
        return <div className="text-center py-12 text-gray-500">Settings - Coming Soon</div>;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
