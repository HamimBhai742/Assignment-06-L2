import { useState } from 'react';
import UserTable, { type User } from './UserTable';
import UserCard from './UserCard';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useGetAllUsersQuery } from '../../../../redux/api/adminApi';
import Pagination from './UserPAgination';

const ManageUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const { data, isLoading } = useGetAllUsersQuery({
    status: statusFilter,
    search: searchTerm,
    limit: itemsPerPage,
    page: currentPage,
  });

  const users = data?.data?.users;
  const activeUsers = data?.data?.activeUsers;
  const blockedUsers = data?.data?.blockedUsers;
  const totalUsers = data?.data?.totalUsers;
  const totalPages = data?.metadata?.totalPage;
  const total = data?.metadata?.total;

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
          <div className='h-8 bg-gray-200 rounded-lg w-48 animate-pulse'></div>
          <div className='flex space-x-4 mt-4 sm:mt-0'>
            <div className='h-10 bg-gray-200 rounded-lg w-64 animate-pulse'></div>
            <div className='h-10 bg-gray-200 rounded-lg w-32 animate-pulse'></div>
          </div>
        </div>
        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
          <div className='space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='flex items-center space-x-4 p-4 border border-gray-100 rounded-xl animate-pulse'
              >
                <div className='h-12 w-12 bg-gray-200 rounded-full'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-gray-200 rounded w-32'></div>
                  <div className='h-3 bg-gray-200 rounded w-48'></div>
                </div>
                <div className='h-6 bg-gray-200 rounded-full w-16'></div>
                <div className='h-8 bg-gray-200 rounded w-20'></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Manage Users</h1>
          <div className='flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-600'>
            <span>Total: {totalUsers}</span>
            <span className='text-green-600'>Active: {activeUsers}</span>
            <span className='text-red-600'>Blocked: {blockedUsers}</span>
          </div>
        </div>

        {/* View Toggle */}
        <div className='flex items-center space-x-2 mt-4 sm:mt-0'>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              viewMode === 'cards'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex-1'>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder='Search by name or phone...'
          />
        </div>
        <FilterDropdown
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: 'all', label: 'All Status' },
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Blocked' },
          ]}
        />
      </div>

      {/* Results */}
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        {data?.data?.length === 0 ? (
          <div className='text-center py-12'>
            <MagnifyingGlassIcon className='h-12 w-12 text-gray-400 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No users found
            </h3>
            <p className='text-gray-600'>
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <UserTable users={users} />
            ) : (
              <div className='p-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {users?.map((user: User) => (
                    <UserCard key={user._id} user={user} />
                  ))}
                </div>
              </div>
            )}
            {!isLoading && total > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={total}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
