import { useState, useEffect } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
  location: string;
  color: string;
}

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Rashida Begum',
      role: 'Business Owner',
      company: 'Begum Enterprises',
      text: 'PayWallet transformed our payment processing. Revenue increased 40% with instant digital transactions.',
      rating: 5,
      avatar: 'RB',
      location: 'Dhaka',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'Mohammad Rahman',
      role: 'Software Engineer',
      company: 'Tech Solutions Ltd',
      text: 'Seamless API integration and robust security. Perfect for our fintech applications.',
      rating: 5,
      avatar: 'MR',
      location: 'Chittagong',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Fatima Khan',
      role: 'Financial Advisor',
      company: 'Khan Financial',
      text: 'Exceptional client onboarding experience. The analytics dashboard provides valuable insights.',
      rating: 5,
      avatar: 'FK',
      location: 'Sylhet',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      role: 'Product Manager',
      company: 'Digital Innovations',
      text: 'Outstanding user experience design. Our customer satisfaction scores improved significantly.',
      rating: 5,
      avatar: 'AH',
      location: 'Rajshahi',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 5,
      name: 'Nasreen Akter',
      role: 'Operations Director',
      company: 'Retail Solutions',
      text: 'Streamlined our entire payment workflow. The support team is incredibly responsive.',
      rating: 5,
      avatar: 'NA',
      location: 'Khulna',
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 6,
      name: 'Karim Uddin',
      role: 'Fleet Manager',
      company: 'Transport Co.',
      text: 'Digital payments revolutionized our driver compensation system. Highly recommended.',
      rating: 5,
      avatar: 'KU',
      location: 'Barisal',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentSlide + i - 1 + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className='py-24 relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900'>
        <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-20'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/10 mb-8 shadow-2xl'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center'>
              <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                <path d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z'/>
              </svg>
            </div>
          </div>
          <h2 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-6'>
            Loved by Professionals
          </h2>
          <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed'>
            Discover why industry leaders choose PayWallet for their financial operations
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className='relative max-w-6xl mx-auto mb-20'>
          <div className='flex items-center justify-center h-[520px] relative'>
            {getVisibleTestimonials().map((testimonial) => {
              const isCenter = testimonial.position === 1;
              const isLeft = testimonial.position === 0;
              
              let transform = '';
              let opacity = '';
              let zIndex = '';
              let filter = '';
              
              if (isCenter) {
                transform = 'translateX(0) scale(1) rotateY(0deg)';
                opacity = 'opacity-100';
                zIndex = 'z-30';
                filter = '';
              } else if (isLeft) {
                transform = 'translateX(-75%) scale(0.8) rotateY(25deg)';
                opacity = 'opacity-60';
                zIndex = 'z-10';
                filter = 'blur-sm';
              } else {
                transform = 'translateX(75%) scale(0.8) rotateY(-25deg)';
                opacity = 'opacity-60';
                zIndex = 'z-10';
                filter = 'blur-sm';
              }

              return (
                <div
                  key={`${testimonial.id}-${currentSlide}`}
                  className={`absolute transition-all duration-1000 ease-out ${opacity} ${zIndex}`}
                  style={{ 
                    transform,
                    filter,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className='relative group'>
                    {/* Glassmorphism Card */}
                    <div className='bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl w-[420px] h-[450px] flex flex-col relative overflow-hidden'>
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} opacity-5 rounded-3xl`}></div>
                      
                      {/* Header */}
                      <div className='relative z-10 flex items-center justify-between mb-8'>
                        <div className='flex items-center space-x-4'>
                          <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.color} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-xl relative`}>
                            <div className='absolute inset-0 bg-white/20 rounded-2xl'></div>
                            <span className='relative z-10'>{testimonial.avatar}</span>
                          </div>
                          <div>
                            <h3 className='font-bold text-xl text-slate-900 dark:text-white mb-1'>
                              {testimonial.name}
                            </h3>
                            <p className='text-slate-600 dark:text-slate-300 text-sm font-medium'>
                              {testimonial.role}
                            </p>
                            <p className={`text-sm font-semibold bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent`}>
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div className='flex space-x-1'>
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className='w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center'>
                              <svg className='w-3 h-3 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quote */}
                      <div className='relative z-10 flex-1 flex items-center'>
                        <blockquote className='text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-medium'>
                          <span className={`text-4xl bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent font-bold`}>"</span>
                          {testimonial.text}
                          <span className={`text-4xl bg-gradient-to-r ${testimonial.color} bg-clip-text text-transparent font-bold`}>"</span>
                        </blockquote>
                      </div>

                      {/* Footer */}
                      <div className='relative z-10 flex items-center justify-between pt-6 border-t border-white/20 dark:border-white/10'>
                        <div className='flex items-center text-slate-500 dark:text-slate-400 text-sm'>
                          <div className={`w-4 h-4 bg-gradient-to-r ${testimonial.color} rounded-full mr-2`}></div>
                          {testimonial.location}
                        </div>
                        <div className='px-3 py-1 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-full border border-white/30 dark:border-white/10 text-xs font-medium text-slate-600 dark:text-slate-300'>
                          Verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className='flex justify-center space-x-3 mb-20'>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                currentSlide === index
                  ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                  : 'w-3 h-3 bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/20 hover:bg-white/50 dark:hover:bg-black/50'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          {[
            { number: '15K+', label: 'Enterprise Clients', gradient: 'from-blue-500 to-cyan-500' },
            { number: '99.9%', label: 'System Uptime', gradient: 'from-emerald-500 to-teal-500' },
            { number: '4.9★', label: 'Customer Rating', gradient: 'from-yellow-500 to-orange-500' },
            { number: '24/7', label: 'Expert Support', gradient: 'from-purple-500 to-pink-500' }
          ].map((stat, index) => (
            <div 
              key={index}
              className='relative group'
            >
              <div className='bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group-hover:scale-105'>
                <div className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                  {stat.number}
                </div>
                <div className='text-slate-600 dark:text-slate-300 text-sm font-medium'>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
