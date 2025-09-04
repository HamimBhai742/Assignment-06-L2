import { useState } from 'react';
import type{ FilterState } from '../Transactions';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

const FilterBar = ({ filters, setFilters }: FilterBarProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    setFilters({
      dateRange: 'all',
      customStartDate: '',
      customEndDate: '',
      type: 'all',
      status: 'all',
      search: '',
      minAmount: '',
      maxAmount: ''
    });
  };

  const hasActiveFilters =
    filters.dateRange !== 'all' ||
    filters.type !== 'all' ||
    filters.status !== 'all' ||
    filters.search ||
    filters.minAmount ||
    filters.maxAmount;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Basic Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search transactions..."
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => updateFilter('dateRange', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 Days</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={filters.type}
            onChange={(e) => updateFilter('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="send">💸 Send Money</option>
            <option value="receive">📥 Receive Money</option>
            <option value="deposit">💰 Deposit</option>
            <option value="withdraw">🏧 Withdraw</option>
            <option value="bill">🧾 Bill Payment</option>
            <option value="recharge">📱 Mobile Recharge</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={filters.status}
            onChange={(e) => updateFilter('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="completed">✅ Completed</option>
            <option value="pending">⏳ Pending</option>
            <option value="failed">❌ Failed</option>
          </select>
        </div>
      </div>

      {/* Custom Date Range */}
      {filters.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input
              type="date"
              value={filters.customStartDate}
              onChange={(e) => updateFilter('customStartDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
            <input
              type="date"
              value={filters.customEndDate}
              onChange={(e) => updateFilter('customEndDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <span>{showAdvanced ? '🔼' : '🔽'}</span>
          <span>Advanced Filters</span>
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm font-medium"
          >
            <span>🗑️</span>
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount (৳)</label>
              <input
                type="number"
                value={filters.minAmount}
                onChange={(e) => updateFilter('minAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Amount (৳)</label>
              <input
                type="number"
                value={filters.maxAmount}
                onChange={(e) => updateFilter('maxAmount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="No limit"
                min="0"
              />
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600">Active filters:</span>
            {filters.dateRange !== 'all' && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                📅 {filters.dateRange}
              </span>
            )}
            {filters.type !== 'all' && (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                🏷️ {filters.type}
              </span>
            )}
            {filters.status !== 'all' && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                📊 {filters.status}
              </span>
            )}
            {filters.search && (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                🔍 "{filters.search}"
              </span>
            )}
            {(filters.minAmount || filters.maxAmount) && (
              <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium">
                💰 Amount Range
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
