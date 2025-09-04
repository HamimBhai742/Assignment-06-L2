import { useState } from 'react';
import type{ UserProfile } from '../Profile';

interface PersonalInfoProps {
  userProfile: UserProfile;
}

const PersonalInfo = ({ userProfile }: PersonalInfoProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone,
    dateOfBirth: userProfile.dateOfBirth,
    address: userProfile.address
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEditing(false);
      // Show success message
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      phone: userProfile.phone,
      dateOfBirth: userProfile.dateOfBirth,
      address: userProfile.address
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            ✏️ Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
              {userProfile.firstName}
            </div>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          {isEditing ? (
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
              {userProfile.lastName}
            </div>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center justify-between">
            <span>{userProfile.email}</span>
            <span className="text-green-600 text-sm">✅ Verified</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Email cannot be changed for security reasons</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center justify-between">
            <span>+880 {userProfile.phone}</span>
            <span className="text-green-600 text-sm">✅ Verified</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed for security reasons</p>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          ) : (
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
              {new Date(userProfile.dateOfBirth).toLocaleDateString('en-GB')}
            </div>
          )}
        </div>

        {/* NID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">NID Number</label>
          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 flex items-center justify-between">
            <span>****{userProfile.nid.slice(-4)}</span>
            <span className="text-green-600 text-sm">✅ Verified</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">NID is verified and cannot be changed</p>
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
        {isEditing ? (
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full address"
          />
        ) : (
          <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
            {userProfile.address}
          </div>
        )}
      </div>

      {/* Account Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">Account Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-blue-700 font-medium">Account ID:</span>
            <p className="text-blue-900">{userProfile.id}</p>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Account Type:</span>
            <p className="text-blue-900 capitalize">{userProfile.accountType}</p>
          </div>
          <div>
            <span className="text-blue-700 font-medium">Last Login:</span>
            <p className="text-blue-900">
              {new Date(userProfile.lastLogin).toLocaleDateString('en-GB')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
