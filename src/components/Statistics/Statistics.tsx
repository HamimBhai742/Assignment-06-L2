import { useGetAllStatsQuery } from '@/redux/api/statsApi';
import { format } from './format';

const Statistics = () => {
  const { data, isLoading } = useGetAllStatsQuery(undefined);
  const stats = data?.data;
  console.log(stats, data);
  return (
    <section>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10'>
        <div className='bg-blue-600 dark:bg-gray-800 py-16 rounded-lg shadow-lg'>
          <div className='text-center mb-12 animate-fade-in-up'>
            <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>
              PayWallet by Numbers
            </h2>
            <p className='text-xl text-blue-100'>
              Trusted by millions across Bangladesh
            </p>
          </div>
          {isLoading ? (
            <div className='grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0'>
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className='text-center animate-pulse'>
                  <div className='h-8 md:h-10 w-20 mx-auto rounded bg-gray-300 dark:bg-gray-700 mb-2'></div>
                  <div className='h-4 w-16 mx-auto rounded bg-gray-200 dark:bg-gray-600'></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
              {[
                {
                  number: `${format(stats?.totalActiveUser)}+`,
                  label: 'Active Users',
                },
                {
                  number: `${format(stats?.totalAgent)}+`,
                  label: 'Agent Points',
                },
                {
                  number: `${format(stats?.totalTransactionAmount)}`,
                  label: 'Transactions',
                },
                {
                  number: `${stats?.downTime}`,
                  label: 'Uptime',
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='text-center animate-fade-in-up'
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className='text-4xl md:text-5xl font-bold text-white mb-2'>
                    {stat.number}
                  </div>
                  <div className='text-blue-100'>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
