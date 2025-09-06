import React from 'react';
import { Link } from 'react-router';

const TestAgentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Agent Dashboard Test</h1>
        <div className="space-y-4">
          <Link 
            to="/agent-dashboard" 
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-center transition-colors"
          >
            Agent Overview
          </Link>
          <Link 
            to="/agent-dashboard/cash-in" 
            className="block w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-center transition-colors"
          >
            Cash In (Add Money)
          </Link>
          <Link 
            to="/agent-dashboard/cash-out" 
            className="block w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-center transition-colors"
          >
            Cash Out (Withdraw Money)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TestAgentDashboard;
