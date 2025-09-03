import { useState } from 'react';

const ContactInqueryFoorm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    subject: '',
    message: '',
    priority: 'medium',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        subject: '',
        message: '',
        priority: 'medium',
      });
    }, 3000);
  };
  return (
    <section className='py-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Send us a Message
          </h2>
          <p className='text-xl text-gray-600'>
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8 md:p-12 min-h-[600px]'>
          {isSubmitted ? (
            <div className='text-center py-12'>
              <div className='w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center'>
                <svg
                  className='w-10 h-10 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M5 13l4 4L19 7'
                  />
                </svg>
              </div>
              <h3 className='text-2xl font-bold text-gray-900 mb-4'>
                Message Sent Successfully!
              </h3>
              <p className='text-gray-600 mb-6'>
                Thank you for contacting us. We've received your message and
                will respond within 24 hours.
              </p>
              <div className='bg-blue-50 rounded-lg p-4'>
                <p className='text-sm text-blue-800'>
                  <strong>Ticket ID:</strong> PW-
                  {Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Personal Information */}
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Full Name *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='Enter your full name'
                  />
                  {errors.name && (
                    <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email Address *
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='Enter your email address'
                  />
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                  )}
                </div>
              </div>

              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Phone Number *
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='+880 1234 567890'
                  />
                  {errors.phone && (
                    <p className='text-red-500 text-sm mt-1'>{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Inquiry Category *
                  </label>
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value=''>Select a category</option>
                    <option value='technical'>Technical Support</option>
                    <option value='billing'>Billing & Payments</option>
                    <option value='account'>Account Issues</option>
                    <option value='security'>Security Concerns</option>
                    <option value='feature'>Feature Request</option>
                    <option value='complaint'>Complaint</option>
                    <option value='other'>Other</option>
                  </select>
                  {errors.category && (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors.category}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Subject *
                </label>
                <input
                  type='text'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='Brief description of your inquiry'
                />
                {errors.subject && (
                  <p className='text-red-500 text-sm mt-1'>{errors.subject}</p>
                )}
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Priority Level
                </label>
                <div className='flex space-x-4'>
                  {[
                    {
                      value: 'low',
                      label: 'Low',
                      color: 'text-green-600 border-green-300',
                    },
                    {
                      value: 'medium',
                      label: 'Medium',
                      color: 'text-yellow-600 border-yellow-300',
                    },
                    {
                      value: 'high',
                      label: 'High',
                      color: 'text-red-600 border-red-300',
                    },
                  ].map((priority) => (
                    <label key={priority.value} className='flex items-center'>
                      <input
                        type='radio'
                        name='priority'
                        value={priority.value}
                        checked={formData.priority === priority.value}
                        onChange={handleChange}
                        className='mr-2'
                      />
                      <span
                        className={`px-3 py-1 rounded-full border text-sm ${
                          priority.color
                        } ${
                          formData.priority === priority.value
                            ? 'bg-opacity-20'
                            : ''
                        }`}
                      >
                        {priority.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Message *
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder='Please provide detailed information about your inquiry...'
                />
                {errors.message && (
                  <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
                )}
                <p className='text-sm text-gray-500 mt-1'>
                  {formData.message.length}/500 characters
                </p>
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactInqueryFoorm;
