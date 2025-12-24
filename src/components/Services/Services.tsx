const Services = () => {
  return (
    <section className='py-16 bg-gray-50 dark:bg-gray-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12 animate-fade-in-up'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Our Services
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Comprehensive financial solutions at your fingertips
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              title: 'Personal Banking',
              desc: 'Manage your personal finances with ease',
              features: [
                'Send Money',
                'Receive Payments',
                'Bill Payments',
                'Mobile Recharge',
              ],
              icon: '👤',
            },
            {
              title: 'Business Solutions',
              desc: 'Scale your business with our merchant services',
              features: [
                'Payment Gateway',
                'Bulk Payments',
                'Payroll Management',
                'Analytics',
              ],
              icon: '🏢',
            },
            {
              title: 'Agent Network',
              desc: 'Join our agent network and earn commissions',
              features: [
                'Cash In/Out',
                'Customer Service',
                'Commission Earning',
                'Training',
              ],
              icon: '🤝',
            },
          ].map((service, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in-up'
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className='text-4xl mb-4'>{service.icon}</div>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                {service.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-300 mb-4'>
                {service.desc}
              </p>
              <ul className='space-y-2'>
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className='flex items-center text-sm text-gray-600 dark:text-gray-400'
                  >
                    <span className='text-green-500 mr-2'>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
