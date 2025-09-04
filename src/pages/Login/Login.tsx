import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useLoginMutation } from '../../redux/api/authApi';
import toast from 'react-hot-toast';

interface LoginData {
  phone: string;
  password: string;
  rememberMe: boolean;
}

const Login = () => {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<LoginData>({
    phone: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [showPassword, setShowPassword] = useState(false);

  const updateFormData = (field: keyof LoginData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^01[3-9]\d{8}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid BD phone number';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      console.log(formData);
      const res = await login(formData);
      console.log(res);
      if (res.data) {
        toast.success(res.data.message);
        setIsLoading(false);
        navigate('/dashboard');
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
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
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
            Welcome Back
          </h1>
          <p className='text-gray-600'>Sign in to your PayWallet account</p>
        </div>

        {/* Login Form */}
        <div className='bg-white rounded-2xl shadow-xl p-6 border border-gray-100'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Phone Number
              </label>
              <input
                type='text'
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                placeholder='Enter your email'
              />
              {errors.phone && (
                <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                  placeholder='Enter your password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
              )}
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    updateFormData('rememberMe', e.target.checked)
                  }
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                />
                <label
                  htmlFor='remember'
                  className='ml-2 text-sm text-gray-600'
                >
                  Remember me
                </label>
              </div>
              <Link
                to='/forgot-password'
                className='text-sm text-blue-600 hover:underline'
              >
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
        {/* Register Link */}
        <div className='text-center mt-6'>
          <p className='text-gray-600'>
            Don't have an account?{' '}
            <Link
              to='/register'
              className='text-blue-600 hover:underline font-semibold'
            >
              Create Account
            </Link>
          </p>
        </div>

        {/* Security Notice */}
        <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <div className='flex items-start space-x-3'>
            <span className='text-blue-500 text-lg'>🔒</span>
            <div>
              <h4 className='text-sm font-medium text-blue-900'>
                Secure Login
              </h4>
              <p className='text-xs text-blue-700 mt-1'>
                Your login is protected with 256-bit SSL encryption and
                multi-factor authentication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
