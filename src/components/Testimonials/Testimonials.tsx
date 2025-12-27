import { useGetAllReviewsQuery } from '@/redux/api/reviewApi';
import { useGetAllStatsQuery } from '@/redux/api/statsApi';
import { useState, useEffect } from 'react';
import TestimonialsSectionSkeleton from './TestimonalSkeleton';

interface Testimonial {
  _id: string;
  user: {
    name: string;
    role: string;
    phone: string;
  };
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { data, isLoading } = useGetAllReviewsQuery(undefined);
  const { data: stats, isLoading: statsLoading } =
    useGetAllStatsQuery(undefined);
  console.log(stats);
  useEffect(() => {
    if (data) {
      setTestimonials(data.data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index =
        (currentSlide + i - 1 + testimonials.length) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };
  if (isLoading) return <TestimonialsSectionSkeleton />;
  return (
    <section className='relative overflow-hidden'>
      {/* Animated Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900'>
        <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
      </div>

      <div className='relative py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='text-center mb-10'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-white/10 mb-8 shadow-2xl'>
            <div className='w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center'>
              <svg
                className='w-4 h-4 text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' />
              </svg>
            </div>
          </div>
          <h2 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent mb-6'>
            Loved by Professionals
          </h2>
          <p className='text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed'>
            Discover why industry leaders choose PayWallet for their financial
            operations
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className='relative max-w-6xl mx-auto mb-10'>
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
                  key={`${testimonial._id}-${currentSlide}`}
                  className={`absolute transition-all duration-1000 ease-out ${opacity} ${zIndex}`}
                  style={{
                    transform,
                    filter,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className='relative group'>
                    {/* Glassmorphism Card */}
                    <div className='bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 dark:border-white/10 shadow-2xl w-[420px] h-[450px] flex flex-col relative overflow-hidden'>
                      {/* Header */}
                      <div className='relative z-10 flex items-center justify-between'>
                        <div className='flex items-center space-x-4'>
                          <div
                            className={`w-16 h-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900   rounded-2xl flex items-center justify-center  font-bold text-lg shadow-xl relative`}
                          >
                            <div className='absolute inset-0 bg-white/20 rounded-2xl'></div>
                            <span className='relative z-10'>
                              {testimonial?.user?.name.charAt(0)}
                              {testimonial?.user?.name.charAt(
                                testimonial?.user?.name.indexOf(' ') + 1
                              )}
                            </span>
                          </div>
                          <div>
                            <h3 className='font-bold text-xl text-slate-900 dark:text-white mb-1'>
                              {testimonial?.user?.name}
                            </h3>
                            <p
                              className={`text-sm font-semibold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-white dark:via-blue-100 dark:to-white bg-clip-text text-transparent`}
                            >
                              {testimonial?.user?.phone}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className='flex space-x-1'>
                          {[...Array(testimonial?.rating)].map((_, i) => (
                            <div
                              key={i}
                              className='w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center'
                            >
                              <svg
                                className='w-3 h-3 text-white'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                              >
                                <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                              </svg>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quote */}
                      <div className='relative z-10 flex-1 flex items-center'>
                        <blockquote className='text-slate-700 dark:text-slate-200 text-lg leading-relaxed font-medium'>
                          {testimonial?.comment}
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className='flex justify-center space-x-2 mb-10'>
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
        {statsLoading ? (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className='relative animate-pulse'>
                <div className='bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl text-center'>
                  {/* Number skeleton */}
                  <div className='h-10 w-24 mx-auto mb-3 rounded-lg bg-gray-300/60 dark:bg-gray-700/60'></div>

                  {/* Label skeleton */}
                  <div className='h-4 w-32 mx-auto rounded bg-gray-200/60 dark:bg-gray-600/60'></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[
              {
                number: `${stats?.data?.totalUsers}+`,
                label: 'Enterprise Clients',
                gradient: 'from-blue-500 to-cyan-500',
              },
              {
                number: `${stats?.data?.downTime}`,
                label: 'System Uptime',
                gradient: 'from-emerald-500 to-teal-500',
              },
              {
                number: `${stats?.data?.avgRating}★`,
                label: 'Customer Rating',
                gradient: 'from-yellow-500 to-orange-500',
              },
              {
                number: '24/7',
                label: 'Expert Support',
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((stat, index) => (
              <div key={index} className='relative group'>
                <div className='bg-white/10 dark:bg-black/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 text-center group-hover:scale-105'>
                  <div
                    className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
                  >
                    {stat.number}
                  </div>
                  <div className='text-slate-600 dark:text-slate-300 text-sm font-medium'>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
