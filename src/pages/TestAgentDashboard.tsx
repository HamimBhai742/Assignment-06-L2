import React from 'react';
import { Link } from 'react-router';

const TestAgentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Test Agent Dashboard</h1>
        <Link 
          to="/agent-dashboard" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg inline-block"
        >
          Go to Agent Dashboard
        </Link>
      </div>
    </div>
  );
};

export default TestAgentDashboard;
