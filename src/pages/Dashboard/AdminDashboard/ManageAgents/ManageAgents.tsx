import { useState } from 'react';
import { useDemoAgentsData } from '../../../../hooks/useDemoAgentsData';
import { usePagination } from '../../../../hooks/usePagination';
import AgentTable from './AgentTable';
import AgentCard from './AgentCard';
import SearchBar from '../ManageUsers/SearchBar';
import AgentFilterDropdown from './AgentFilterDropdown';
import Pagination from '../../../../components/Pagination/Pagination';
import { MagnifyingGlassIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const ManageAgents = () => {
  const { data: agents, isLoading } = useDemoAgentsData();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredAgents = agents?.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.phone.includes(searchTerm) ||
                         agent.agentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const {
    currentPage,
    totalPages,
    paginatedData: paginatedAgents,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination({ data: filteredAgents, itemsPerPage: 10 });

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse"></div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-64 animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 border border-gray-100 rounded-xl animate-pulse">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="h-4 bg-gray-200 rounded w-24 sm:w-32"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 sm:w-48"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded-full w-12 sm:w-16 flex-shrink-0"></div>
                <div className="h-8 bg-gray-200 rounded w-16 sm:w-20 flex-shrink-0"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const statusCounts = {
    pending: agents?.filter(a => a.status === 'pending').length || 0,
    approved: agents?.filter(a => a.status === 'approved').length || 0,
    suspended: agents?.filter(a => a.status === 'suspended').length || 0,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manage Agents</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-600">
            <span>Total: {agents?.length || 0}</span>
            <span className="text-yellow-600">Pending: {statusCounts.pending}</span>
            <span className="text-green-600">Approved: {statusCounts.approved}</span>
            <span className="text-red-600">Suspended: {statusCounts.suspended}</span>
          </div>
        </div>
        
        {/* View Toggle */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <button
            onClick={() => setViewMode('table')}
            className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              viewMode === 'table' 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode('cards')}
            className={`px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by name, email, phone, or agent ID..."
          />
        </div>
        <div className="flex-shrink-0">
          <AgentFilterDropdown
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredAgents.length === 0 ? (
          <div className="text-center py-8 sm:py-12 px-4">
            <UserGroupIcon className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <>
            {viewMode === 'table' ? (
              <AgentTable agents={paginatedAgents} />
            ) : (
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedAgents.map(agent => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>
            )}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={goToPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ManageAgents;
