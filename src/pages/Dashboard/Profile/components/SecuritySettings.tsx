import { useState } from 'react';

const SecuritySettings = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showChangePIN, setShowChangePIN] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [pinForm, setPinForm] = useState({
    currentPIN: '',
    newPIN: '',
    confirmPIN: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Password changed successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setShowChangePassword(false);
    } catch (error) {
      alert('Failed to change password');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePINChange = async () => {
    if (pinForm.newPIN !== pinForm.confirmPIN) {
      alert('PINs do not match');
      return;
    }
    
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('PIN changed successfully');
      setPinForm({ currentPIN: '', newPIN: '', confirmPIN: '' });
      setShowChangePIN(false);
    } catch (error) {
      alert('Failed to change PIN');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>

      {/* Password Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">Login Password</h4>
            <p className="text-sm text-gray-600">Last changed 30 days ago</p>
          </div>
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showChangePassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {showChangePassword && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password (min 8 characters)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
            
            <button
              onClick={handlePasswordChange}
              disabled={isProcessing || !passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Changing Password...' : 'Update Password'}
            </button>
          </div>
        )}
      </div>

      {/* PIN Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">Transaction PIN</h4>
            <p className="text-sm text-gray-600">Used for transaction verification</p>
          </div>
          <button
            onClick={() => setShowChangePIN(!showChangePIN)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showChangePIN ? 'Cancel' : 'Change PIN'}
          </button>
        </div>

        {showChangePIN && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current PIN</label>
              <input
                type="password"
                value={pinForm.currentPIN}
                onChange={(e) => setPinForm(prev => ({ ...prev, currentPIN: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                placeholder="Enter current PIN"
                maxLength={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New PIN</label>
              <input
                type="password"
                value={pinForm.newPIN}
                onChange={(e) => setPinForm(prev => ({ ...prev, newPIN: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                placeholder="Enter new 4-digit PIN"
                maxLength={4}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New PIN</label>
              <input
                type="password"
                value={pinForm.confirmPIN}
                onChange={(e) => setPinForm(prev => ({ ...prev, confirmPIN: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                placeholder="Confirm new PIN"
                maxLength={4}
              />
            </div>
            
            <button
              onClick={handlePINChange}
              disabled={isProcessing || !pinForm.currentPIN || !pinForm.newPIN || !pinForm.confirmPIN}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isProcessing ? 'Changing PIN...' : 'Update PIN'}
            </button>
          </div>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-green-600 font-medium">✅ Enabled</span>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-medium text-gray-900">Active Sessions</h4>
            <p className="text-sm text-gray-600">Manage your active login sessions</p>
          </div>
          <button className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors">
            End All Sessions
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-green-600">🖥️</span>
              <div>
                <p className="font-medium text-gray-900">Current Session</p>
                <p className="text-sm text-gray-600">Chrome on Windows • Dhaka, Bangladesh</p>
              </div>
            </div>
            <span className="text-sm text-green-600 font-medium">Active Now</span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-gray-600">📱</span>
              <div>
                <p className="font-medium text-gray-900">Mobile App</p>
                <p className="text-sm text-gray-600">Android App • 2 hours ago</p>
              </div>
            </div>
            <button className="text-sm text-red-600 hover:underline">End Session</button>
          </div>
        </div>
      </div>

      {/* Security Tips */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-yellow-500 text-lg">💡</span>
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Security Tips</h4>
            <ul className="text-xs text-yellow-700 mt-1 space-y-1">
              <li>• Use a strong, unique password for your account</li>
              <li>• Never share your PIN with anyone</li>
              <li>• Enable two-factor authentication for extra security</li>
              <li>• Log out from public devices after use</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
