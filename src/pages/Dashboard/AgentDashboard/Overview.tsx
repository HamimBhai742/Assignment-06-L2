import React from 'react';
import SummaryCards from './components/SummaryCards';
import RecentActivity from './components/RecentActivity';

const Overview: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-600 mt-1">Monitor your transactions and account activity</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default Overview;
