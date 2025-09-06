import type { FilterBarProps, FilterState } from "../intrefaces";



const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      sort: '-createdAt',
      type: 'all',
      status: 'all',
      search: '',
    });
  };

  const hasActiveFilters =
    filters.type !== 'all' ||
    filters.status !== 'all' ||
    filters.search ||
    filters.sort !== '-createdAt';

  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6'>
      {/* Basic Filters */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        {/* Search */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Search
          </label>
          <div className='relative'>
            <input
              type='text'
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              placeholder='Search transactions...'
            />
            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
              🔍
            </span>
          </div>
        </div>

        {/* Sorting */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Sorting
          </label>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='-createdAt'>Newest </option>
            <option value='createdAt'>Oldest</option>
            <option value='amount'>Low to High</option>
            <option value='-amount'>High to Low</option>
          </select>
        </div>

        {/* Transaction Type */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='all'>All Types</option>
            <option value='send_money'>💸 Send Money</option>
            <option value='receive_money'>📥 Receive Money</option>
            <option value='deposit'>💰 Deposit</option>
            <option value='withdraw'>🏧 Withdraw</option>
            <option value='bill'>🧾 Bill Payment</option>
            <option value='recharge'>📱 Mobile Recharge</option>
            <option value='add_money'>⬇️ Add Money</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='all'>All Status</option>
            <option value='completed'>✅ Completed</option>
            <option value='pending'>⏳ Pending</option>
            <option value='failed'>❌ Failed</option>
          </select>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className='flex items-center justify-between'>
        {/* <div></div> */}
        <button className='flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium'>
          <span>🔼🔽</span>
          <span>Advanced Filters</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className='flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium'
          >
            <span>🗑️</span>
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className='mt-4 pt-4 border-t border-gray-200'>
          <div className='flex flex-wrap gap-2'>
            <span className='text-sm text-gray-600'>Active filters:</span>
            {filters.sort !== '-createdAt' && (
              <span className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'>
                📅 {filters.sort}
              </span>
            )}
            {filters.type !== 'all' && (
              <span className='px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium'>
                🏷️ {filters.type}
              </span>
            )}
            {filters.status !== 'all' && (
              <span className='px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium'>
                📊 {filters.status}
              </span>
            )}
            {filters.search && (
              <span className='px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium'>
                🔍 "{filters.search}"
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
