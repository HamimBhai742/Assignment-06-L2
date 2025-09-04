import { useState } from 'react';

interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  email: boolean;
  sms: boolean;
  push: boolean;
  category: string;
}

const NotificationSettings = () => {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'transactions',
      title: 'Transaction Notifications',
      description: 'Get notified about all money transfers and payments',
      email: true,
      sms: true,
      push: true,
      category: 'transactions'
    },
    {
      id: 'security',
      title: 'Security Alerts',
      description: 'Login attempts, password changes, and security updates',
      email: true,
      sms: true,
      push: true,
      category: 'security'
    },
    {
      id: 'promotions',
      title: 'Promotions & Offers',
      description: 'Special offers, cashback, and promotional campaigns',
      email: false,
      sms: false,
      push: true,
      category: 'marketing'
    },
    {
      id: 'bills',
      title: 'Bill Reminders',
      description: 'Reminders for upcoming bill payments and due dates',
      email: true,
      sms: false,
      push: true,
      category: 'bills'
    },
    {
      id: 'account',
      title: 'Account Updates',
      description: 'Account verification, limits, and policy changes',
      email: true,
      sms: false,
      push: false,
      category: 'account'
    },
    {
      id: 'support',
      title: 'Support Messages',
      description: 'Customer support responses and ticket updates',
      email: true,
      sms: false,
      push: true,
      category: 'support'
    }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const updatePreference = (id: string, type: 'email' | 'sms' | 'push', value: boolean) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, [type]: value } : pref
      )
    );
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Notification preferences saved successfully!');
    } catch (error) {
      alert('Failed to save preferences. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transactions': return '💸';
      case 'security': return '🔒';
      case 'marketing': return '🎁';
      case 'bills': return '🧾';
      case 'account': return '👤';
      case 'support': return '💬';
      default: return '🔔';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transactions': return 'bg-blue-50 border-blue-200';
      case 'security': return 'bg-red-50 border-red-200';
      case 'marketing': return 'bg-green-50 border-green-200';
      case 'bills': return 'bg-yellow-50 border-yellow-200';
      case 'account': return 'bg-purple-50 border-purple-200';
      case 'support': return 'bg-gray-50 border-gray-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
        <button
          onClick={handleSavePreferences}
          disabled={isSaving}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Notification Methods Header */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="font-medium text-gray-900">Notification Type</div>
          <div className="text-center font-medium text-gray-700">📧 Email</div>
          <div className="text-center font-medium text-gray-700">📱 SMS</div>
          <div className="text-center font-medium text-gray-700">🔔 Push</div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="space-y-4">
        {preferences.map((pref) => (
          <div key={pref.id} className={`border rounded-lg p-4 ${getCategoryColor(pref.category)}`}>
            <div className="grid grid-cols-4 gap-4 items-center">
              {/* Notification Info */}
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{getCategoryIcon(pref.category)}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{pref.title}</h4>
                  <p className="text-sm text-gray-600">{pref.description}</p>
                </div>
              </div>

              {/* Email Toggle */}
              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pref.email}
                    onChange={(e) => updatePreference(pref.id, 'email', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* SMS Toggle */}
              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pref.sms}
                    onChange={(e) => updatePreference(pref.id, 'sms', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {/* Push Toggle */}
              <div className="flex justify-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pref.push}
                    onChange={(e) => updatePreference(pref.id, 'push', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => {
            setPreferences(prev => prev.map(pref => ({ ...pref, email: true, sms: true, push: true })));
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
        >
          Enable All
        </button>
        <button
          onClick={() => {
            setPreferences(prev => prev.map(pref => ({ ...pref, email: false, sms: false, push: false })));
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Disable All
        </button>
        <button
          onClick={() => {
            setPreferences(prev => prev.map(pref => 
              pref.category === 'security' || pref.category === 'transactions' 
                ? { ...pref, email: true, sms: true, push: true }
                : { ...pref, email: false, sms: false, push: false }
            ));
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Essential Only
        </button>
      </div>

      {/* Notification Schedule */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Notification Schedule</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours Start</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quiet Hours End</label>
            <input
              type="time"
              defaultValue="08:00"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          During quiet hours, only critical security notifications will be sent.
        </p>
      </div>

      {/* Contact Preferences */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Contact Information</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">john.doe@example.com</p>
            </div>
            <span className="text-green-600 text-sm font-medium">✅ Verified</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">SMS Notifications</p>
              <p className="text-sm text-gray-600">+880 1712345678</p>
            </div>
            <span className="text-green-600 text-sm font-medium">✅ Verified</span>
          </div>
        </div>
      </div>

      {/* Information Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-lg">ℹ️</span>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Important Information</h4>
            <ul className="text-xs text-blue-700 mt-1 space-y-1">
              <li>• Security and transaction notifications cannot be completely disabled</li>
              <li>• Changes may take up to 24 hours to take effect</li>
              <li>• You can update these preferences anytime</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
