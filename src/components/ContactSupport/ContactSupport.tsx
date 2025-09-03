import React from 'react';

const ContactSupport = () => {
  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12'>
          {/* FAQ Section */}
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-8'>
              Frequently Asked Questions
            </h3>
            <div className='space-y-4'>
              {[
                {
                  q: 'How do I reset my PayWallet PIN?',
                  a: 'Go to Settings > Security > Reset PIN and follow the verification steps.',
                },
                {
                  q: 'What are the transaction limits?',
                  a: 'Daily limit is ₹50,000 for verified accounts and ₹10,000 for basic accounts.',
                },
                {
                  q: 'How long do transfers take?',
                  a: 'Instant transfers within PayWallet network. Bank transfers take 1-2 business days.',
                },
                {
                  q: 'Is my money safe with PayWallet?',
                  a: 'Yes, we use bank-level security and are regulated by Bangladesh Bank.',
                },
              ].map((faq, index) => (
                <div key={index} className='bg-gray-50 rounded-lg p-6'>
                  <h4 className='font-semibold text-gray-900 mb-2'>{faq.q}</h4>
                  <p className='text-gray-600 text-sm'>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-8'>
              Other Ways to Reach Us
            </h3>
            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center'>
                  <span className='text-xl'>🏢</span>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-900'>Head Office</h4>
                  <p className='text-gray-600 text-sm'>
                    PayWallet Tower, Gulshan-1
                    <br />
                    Dhaka-1212, Bangladesh
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center'>
                  <span className='text-xl'>⏰</span>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-900'>
                    Business Hours
                  </h4>
                  <p className='text-gray-600 text-sm'>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <div className='w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center'>
                  <span className='text-xl'>🌐</span>
                </div>
                <div>
                  <h4 className='font-semibold text-gray-900'>Social Media</h4>
                  <div className='flex space-x-3 mt-2'>
                    {['Facebook', 'Twitter', 'LinkedIn'].map((social) => (
                      <button
                        key={social}
                        className='text-blue-600 hover:text-blue-700 text-sm'
                      >
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSupport;
