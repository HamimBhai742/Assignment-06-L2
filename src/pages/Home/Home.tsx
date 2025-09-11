import FeatureHome from '@/components/FeaturesHome/FeatureHome';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import CtaSection from '@/components/CTASection/CtaSection';

const Home = () => {
  return (
    <div>
      <section id='home'>
        <HeroBanner />
      </section>

      {/* Features Preview Section */}
      <section>
        <FeatureHome />
      </section>

      {/* How It Works Section */}
      <section className='py-20 bg-gray-50 dark:bg-gray-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              How PayWallet Works
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>
              Get started in just 3 simple steps
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                step: '01',
                title: 'Create Account',
                description:
                  'Sign up with your mobile number and verify your identity in minutes',
                icon: '📝',
              },
              {
                step: '02',
                title: 'Add Money',
                description:
                  'Cash in from any agent point or link your bank account for easy funding',
                icon: '💰',
              },
              {
                step: '03',
                title: 'Start Transacting',
                description:
                  "Send money, pay bills, or cash out whenever you need - it's that simple!",
                icon: '🚀',
              },
            ].map((step, index) => (
              <div key={index} className='text-center'>
                <div className='relative mb-8'>
                  <div className='w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-3xl'>{step.icon}</span>
                  </div>
                  <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
                    <span className='text-sm font-bold text-gray-900'>
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-3'>
                  {step.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300'>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <CtaSection />
      </section>
    </div>
  );
};

export default Home;
