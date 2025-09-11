import { useState, useEffect } from 'react';
import { Link } from 'react-router';

const HeroBanner = () => {
  const [stats, setStats] = useState({
    users: 0,
    transactions: 0,
    countries: 0,
  });

  useEffect(() => {
    const animateStats = () => {
      const targets = { users: 50, transactions: 2000, countries: 15 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          users: Math.floor(targets.users * progress),
          transactions: Math.floor(targets.transactions * progress),
          countries: Math.floor(targets.countries * progress),
        });

        if (step >= steps) clearInterval(timer);
      }, stepTime);
    };

    animateStats();
  }, []);

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0'>
        <div className='absolute top-20 left-10 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute top-40 right-10 w-80 h-80 bg-green-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-2000'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center min-h-screen'>
        {/* Text Content */}
        <div className='lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0'>
          <div className='mb-6'>
            <span className='bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-2 rounded-full text-sm font-semibold'>
              🚀 Bangladesh's #1 Digital Wallet
            </span>
          </div>

          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight'>
            Send Money
            <span className='bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent'>
              {' '}
              Instantly{' '}
            </span>
            Anywhere
          </h1>

          <p className='text-lg md:text-xl text-blue-100 mb-8 max-w-lg mx-auto lg:mx-0'>
            Send money, cash out, cash in, deposit, withdraw and manage your
            finances securely with PayWallet. Trusted by millions across
            Bangladesh.
          </p>

          {/* Features List */}
          <div className='flex flex-wrap gap-4 mb-8 justify-center lg:justify-start'>
            <div className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
              <span className='text-green-400'>✓</span>
              <span className='text-white text-sm'>Instant Transfer</span>
            </div>
            <div className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
              <span className='text-green-400'>✓</span>
              <span className='text-white text-sm'>High Level Security</span>
            </div>
            <div className='flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full'>
              <span className='text-green-400'>✓</span>
              <span className='text-white text-sm'>24/7 Support</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8'>
            <Link
              to='/login'
              className='px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg'
            >
              Sign In
            </Link>
            <Link
              to='/register'
              className='px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300'
            >
              Create Account
            </Link>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0'>
            <div className='text-center'>
              <div className='text-2xl md:text-3xl font-bold text-yellow-400'>
                {stats.users}M+
              </div>
              <div className='text-blue-200 text-sm'>Users</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl md:text-3xl font-bold text-green-400'>
                ৳{stats.transactions}B+
              </div>
              <div className='text-blue-200 text-sm'>Transactions</div>
            </div>
            <div className='text-center'>
              <div className='text-2xl md:text-3xl font-bold text-orange-400'>
                {stats.countries}+
              </div>
              <div className='text-blue-200 text-sm'>Countries</div>
            </div>
          </div>
        </div>

        {/* Visual Element - Mobile Phone Mockup */}
        <div className='lg:w-1/2 flex justify-center'>
          <div className='relative'>
            {/* Floating Cards */}
            <div className='absolute -top-10 -left-10 bg-white rounded-2xl p-4 shadow-2xl animate-bounce'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-green-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm'>✓</span>
                </div>
                <div>
                  <div className='text-sm font-semibold text-gray-900'>
                    Payment Sent
                  </div>
                  <div className='text-xs text-gray-500'>৳2,500 to Hamim</div>
                </div>
              </div>
            </div>

            <div className='absolute -top-5 -right-10 bg-white rounded-2xl p-4 shadow-2xl animate-pulse delay-1000'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm'>💳</span>
                </div>
                <div>
                  <div className='text-sm font-semibold text-gray-900'>
                    Bill Paid
                  </div>
                  <div className='text-xs text-gray-500'>
                    Electricity ৳1,200
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className='relative w-64 h-96 md:w-80 md:h-[500px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl'>
              <div className='w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-[2.5rem] overflow-hidden'>
                {/* Phone Screen Content */}
                <div className='p-6 text-white'>
                  <div className='flex justify-between items-center mb-8'>
                    <div className='text-lg font-semibold'>PayWallet</div>
                    <div className='text-sm'>{new Date().toLocaleString()}</div>
                  </div>

                  <div className='text-center mb-8'>
                    <div className='text-sm opacity-80'>Available Balance</div>
                    <div className='text-3xl font-bold'>৳25,450</div>
                  </div>

                  <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center'>
                      <div className='text-2xl mb-2'>💸</div>
                      <div className='text-sm'>Send Money</div>
                    </div>
                    <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center'>
                      <div className='text-2xl mb-2'>📱</div>
                      <div className='text-sm'>Cash In</div>
                    </div>
                    <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center'>
                      <div className='text-2xl mb-2'>🧾</div>
                      <div className='text-sm'>All Transactions</div>
                    </div>
                    <div className='bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center'>
                      <div className='text-2xl mb-2'>💰</div>
                      <div className='text-sm'>Cash Out</div>
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <div className='flex justify-between items-center bg-white/10 rounded-xl p-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-green-500 rounded-full'></div>
                        <div>
                          <div className='text-sm font-medium'>
                            Received from Sarah
                          </div>
                          <div className='text-xs opacity-70'>2 hours ago</div>
                        </div>
                      </div>
                      <div className='text-green-400 font-semibold'>
                        +৳3,200
                      </div>
                    </div>

                    <div className='flex justify-between items-center bg-white/10 rounded-xl p-3'>
                      <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-blue-500 rounded-full'></div>
                        <div>
                          <div className='text-sm font-medium'>
                            Electricity Bill
                          </div>
                          <div className='text-xs opacity-70'>Yesterday</div>
                        </div>
                      </div>
                      <div className='text-red-400 font-semibold'>-৳1,200</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Floating Card */}
            <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-2xl animate-bounce delay-2000'>
              <div className='flex items-center space-x-3'>
                <div className='w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm'>🎁</span>
                </div>
                <div>
                  <div className='text-sm font-semibold text-gray-900'>
                    commission Earned
                  </div>
                  <div className='text-xs text-gray-500'>৳50 on cash out</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-8 text-white/60'>
        <div className='flex items-center space-x-2'>
          <span className='text-lg'>🏦</span>
          <span className='text-sm'>Bangladesh Bank Licensed</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-lg'>🔒</span>
          <span className='text-sm'>256-bit Encryption</span>
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-lg'>⭐</span>
          <span className='text-sm'>4.8★ Rating</span>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
