export default function ContactHeroBanner() {
  return (
    <section className='relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden'>
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-white/10 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-white/5 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-6xl font-bold text-white mb-6'>
            Get in Touch
            <span className='block text-2xl md:text-3xl font-normal text-blue-200 dark:text-gray-300 mt-2'>
              We're here to help 24/7
            </span>
          </h1>
          <p className='text-xl text-blue-100 dark:text-gray-400 max-w-3xl mx-auto'>
            Have questions about your PayWallet account? Need technical support?
            Our dedicated team is ready to assist you.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          {[
            {
              icon: '📞',
              title: 'Phone Support',
              desc: '24/7 Customer Care',
              value: '+880-1234-567890',
              color: 'from-green-400 to-emerald-500',
            },
            {
              icon: '💬',
              title: 'Live Chat',
              desc: 'Instant Response',
              value: 'Available in App',
              color: 'from-blue-400 to-cyan-500',
            },
            {
              icon: '📧',
              title: 'Email Support',
              desc: 'Detailed Assistance',
              value: 'support@paywallet.com',
              color: 'from-purple-400 to-pink-500',
            },
          ].map((contact, index) => (
            <div
              key={index}
              className='bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-300'
            >
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${contact.color} flex items-center justify-center text-2xl`}
              >
                {contact.icon}
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>
                {contact.title}
              </h3>
              <p className='text-blue-200 dark:text-gray-300 text-sm mb-2'>{contact.desc}</p>
              <p className='text-white font-medium'>{contact.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
