import type{ UserProfile } from '../Profile';

interface VerificationStatusProps {
  userProfile: UserProfile;
}

const VerificationStatus = ({ userProfile }: VerificationStatusProps) => {
  const verificationSteps = [
    {
      id: 'phone',
      title: 'Phone Number',
      description: 'Verify your mobile number',
      status: 'completed',
      icon: '📱',
      completedDate: '2023-01-15'
    },
    {
      id: 'email',
      title: 'Email Address',
      description: 'Verify your email address',
      status: 'completed',
      icon: '📧',
      completedDate: '2023-01-15'
    },
    {
      id: 'nid',
      title: 'National ID',
      description: 'Upload and verify your NID',
      status: 'completed',
      icon: '🆔',
      completedDate: '2023-01-16'
    },
    {
      id: 'photo',
      title: 'Photo Verification',
      description: 'Take a selfie for identity verification',
      status: 'completed',
      icon: '📸',
      completedDate: '2023-01-16'
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Upload utility bill or bank statement',
      status: 'pending',
      icon: '🏠',
      completedDate: null
    },
    {
      id: 'income',
      title: 'Income Verification',
      description: 'Upload salary certificate or tax documents',
      status: 'not_started',
      icon: '💼',
      completedDate: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'not_started': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'pending': return '⏳';
      case 'not_started': return '⭕';
      default: return '⭕';
    }
  };

  const completedSteps = verificationSteps.filter(step => step.status === 'completed').length;
  const totalSteps = verificationSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const getLevelBenefits = (level: string) => {
    switch (level) {
      case 'basic':
        return [
          'Send up to ৳5,000 per day',
          'Receive up to ৳10,000 per day',
          'Basic customer support'
        ];
      case 'standard':
        return [
          'Send up to ৳25,000 per day',
          'Receive up to ৳50,000 per day',
          'Priority customer support',
          'Access to all features'
        ];
      case 'premium':
        return [
          'Unlimited daily transactions',
          'Premium customer support',
          'Advanced security features',
          'Business account features'
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Account Verification</h3>

      {/* Verification Progress */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-semibold text-gray-900">Verification Progress</h4>
            <p className="text-sm text-gray-600">
              {completedSteps} of {totalSteps} steps completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
            <div className={`text-sm font-medium capitalize ${
              userProfile.verificationLevel === 'premium' ? 'text-green-600' :
              userProfile.verificationLevel === 'standard' ? 'text-blue-600' : 'text-orange-600'
            }`}>
              {userProfile.verificationLevel} Level
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="text-sm text-gray-600">
          Complete all verification steps to unlock premium features and higher transaction limits.
        </div>
      </div>

      {/* Current Level Benefits */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h4 className="font-medium text-gray-900 mb-4">Current Level Benefits</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {getLevelBenefits(userProfile.verificationLevel).map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Steps */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Verification Steps</h4>

        {verificationSteps.map((step) => (
          <div key={step.id} className={`border rounded-lg p-4 ${getStatusColor(step.status)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">{step.icon}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h5 className="font-medium text-gray-900">{step.title}</h5>
                    <span className="text-lg">{getStatusIcon(step.status)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                  {step.completedDate && (
                    <p className="text-xs text-gray-500 mt-1">
                      Completed on {new Date(step.completedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-right">
                {step.status === 'completed' && (
                  <span className="text-sm font-medium text-green-700">Verified</span>
                )}
                {step.status === 'pending' && (
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors">
                    Review
                  </button>
                )}
                {step.status === 'not_started' && (
                  <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                    Start
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upgrade Benefits */}
      {userProfile.verificationLevel !== 'premium' && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-purple-900 mb-2">Upgrade to Premium Level</h4>
              <p className="text-sm text-purple-700 mb-4">
                Complete remaining verification steps to unlock premium features:
              </p>
              <ul className="text-sm text-purple-700 space-y-1 mb-4">
                <li>• Unlimited transaction limits</li>
                <li>• Priority customer support</li>
                <li>• Advanced security features</li>
                <li>• Business account access</li>
              </ul>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                Continue Verification
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <span className="text-blue-500 text-lg">❓</span>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Need Help with Verification?</h4>
            <p className="text-xs text-blue-700 mt-1 mb-3">
              Our support team is here to help you complete your verification process.
            </p>
            <div className="flex space-x-3">
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
              <button className="px-3 py-1 border border-blue-300 text-blue-700 rounded text-sm hover:bg-blue-100 transition-colors">
                View Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;
