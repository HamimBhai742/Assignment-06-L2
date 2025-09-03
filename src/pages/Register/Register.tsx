/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { useCreateAccountMutation } from '../../redux/api/userApi';

interface FormData {
  role: 'user' | 'agent';
  name: string;
  phone: string;
  password: string;
  agreeTerms: boolean;
}

const Register = () => {
  const [step, setStep] = useState(1);
  const [createAccount, { isLoading }] = useCreateAccountMutation();
  const [formData, setFormData] = useState<FormData>({
    role: 'user',
    name: '',
    phone: '',
    password: '',
    agreeTerms: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.role)
        newErrors.role = 'Please select a role' as 'user' | 'agent';
    }

    if (currentStep === 2) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      else if (!/^01[3-9]\d{8}$/.test(formData.phone))
        newErrors.phone = 'Invalid BD phone number';
    }

    if (currentStep === 3) {
      if (!formData.password) newErrors.password = 'Password is required';
      else if (formData.password.length < 6)
        newErrors.password = 'PIN must be at least 6 digit';
      if (!formData.agreeTerms)
        newErrors.agreeTerms = 'You must agree to terms';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    setIsSubmitting(true);
    try {
      // Simulate API call
      console.log(formData);
      const res = await createAccount(formData);
      console.log(res.data);
      console.log(res.error);
      if (res.data) {
        toast.success(res.data.message);
        setIsSubmitting(false);
      }
      if (res.error) {
        const err = res.error as { data: { message: string } };
        const errSrc = res.error as {
          data: { errorSource: { message: string }[] };
        };
        if (errSrc.data.errorSource.length > 0) {
          toast.error(errSrc.data.errorSource[0].message);
        } else {
          toast.error(err.data.message);
        }
        setIsSubmitting(false);
      }
    } catch (error: any) {
      console.log(error);
      setIsSubmitting(false);
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4'>
            <span className='text-2xl text-white'>💳</span>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Join PayWallet
          </h1>
          <p className='text-gray-600'>Create your digital wallet account</p>
        </div>

        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-2'>
            {[1, 2, 3].map((num) => (
              <div key={num} className='flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      step > num ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-between text-xs text-gray-500'>
            <span>Role</span>
            <span>Details</span>
            <span>Security</span>
          </div>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100'>
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className='space-y-6'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                  Choose Your Role
                </h2>
                <p className='text-gray-600 text-sm'>
                  Select how you want to use PayWallet
                </p>
              </div>

              <div className='space-y-4'>
                <button
                  onClick={() => updateFormData('role', 'user')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'user'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-center space-x-4'>
                    <div className='bg-blue-100 p-3 rounded-lg'>
                      <span className='text-2xl'>👤</span>
                    </div>
                    <div className='text-left'>
                      <h3 className='font-semibold text-gray-900'>
                        Personal User
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Send money, pay bills, shop online
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => updateFormData('role', 'agent')}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    formData.role === 'agent'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className='flex items-center space-x-4'>
                    <div className='bg-purple-100 p-3 rounded-lg'>
                      <span className='text-2xl'>🏪</span>
                    </div>
                    <div className='text-left'>
                      <h3 className='font-semibold text-gray-900'>
                        Agent/Merchant
                      </h3>
                      <p className='text-sm text-gray-600'>
                        Provide cash-in/out services
                      </p>
                    </div>
                  </div>
                </button>
              </div>

              {errors.role && (
                <p className='text-red-500 text-sm'>{errors.role}</p>
              )}

              <button
                onClick={handleNext}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all'
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className='space-y-6'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                  Personal Information
                </h2>
                <p className='text-gray-600 text-sm'>Tell us about yourself</p>
              </div>

              <div className='space-y-4'>
                <div className=''>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Name
                    </label>
                    <input
                      type='text'
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      placeholder='John'
                    />
                    {errors.name && (
                      <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='01XXXXXXXXX'
                  />
                  {errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className='flex space-x-4'>
                <button
                  onClick={() => setStep(1)}
                  className='flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors'
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all'
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Security Setup */}
          {step === 3 && (
            <div className='space-y-6'>
              <div className='text-center'>
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>
                  Security Setup
                </h2>
                <p className='text-gray-600 text-sm'>Secure your account</p>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Security PIN
                  </label>
                  <input
                    type='password'
                    value={formData.password}
                    onChange={(e) => updateFormData('password', e.target.value)}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    placeholder='6-digit PIN'
                    maxLength={6}
                  />
                  {errors.password && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className='flex items-start space-x-3'>
                  <input
                    type='checkbox'
                    id='terms'
                    checked={formData.agreeTerms}
                    onChange={(e) =>
                      updateFormData('agreeTerms', e.target.checked)
                    }
                    className='mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                  />
                  <label htmlFor='terms' className='text-sm text-gray-600'>
                    I agree to the{' '}
                    <a href='#' className='text-blue-600 hover:underline'>
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href='#' className='text-blue-600 hover:underline'>
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className='text-red-500 text-xs'>{errors.agreeTerms}</p>
                )}
              </div>

              <div className='flex space-x-4'>
                <button
                  onClick={() => setStep(2)}
                  className='flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors'
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50'
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Login Link */}
        <div className='text-center mt-6'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-600 hover:underline font-semibold'
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
