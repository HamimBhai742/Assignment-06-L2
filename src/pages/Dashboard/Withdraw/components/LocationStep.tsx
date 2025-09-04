import { useState } from 'react';
import type{ WithdrawData } from '../Withdraw';

interface LocationStepProps {
  data: WithdrawData;
  updateData: (data: Partial<WithdrawData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const LocationStep = ({ data, updateData, onNext, onPrev }: LocationStepProps) => {
  const [searchLocation, setSearchLocation] = useState('');

  // Mock data for different methods
  const mockAgents = [
    {
      id: 'AG001',
      name: 'Rahman Store',
      location: 'Dhanmondi 27, Dhaka',
      distance: '0.5 km',
      rating: 4.8,
      fee: '৳15',
      status: 'open',
      phone: '01712345678'
    },
    {
      id: 'AG002',
      name: 'City Mart',
      location: 'Gulshan 2, Dhaka',
      distance: '1.2 km',
      rating: 4.6,
      fee: '৳10',
      status: 'open',
      phone: '01812345678'
    },
    {
      id: 'AG003',
      name: 'Digital Point',
      location: 'Uttara Sector 7, Dhaka',
      distance: '2.1 km',
      rating: 4.9,
      fee: '৳20',
      status: 'busy',
      phone: '01912345678'
    }
  ];

  const mockATMs = [
    {
      id: 'ATM001',
      name: 'DBBL ATM',
      location: 'Dhanmondi 32, Dhaka',
      distance: '0.3 km',
      fee: '৳15',
      status: 'active'
    },
    {
      id: 'ATM002',
      name: 'BRAC Bank ATM',
      location: 'Gulshan Avenue, Dhaka',
      distance: '0.8 km',
      fee: '৳15',
      status: 'active'
    }
  ];

  const mockBanks = [
    {
      id: 'BANK001',
      name: 'DBBL - Main Account',
      account: '****1234',
      fee: 'Free',
      time: '1-2 hours'
    },
    {
      id: 'BANK002',
      name: 'BRAC Bank - Savings',
      account: '****5678',
      fee: 'Free',
      time: '1-2 hours'
    }
  ];

  const handleLocationSelect = (item: any) => {
    if (data.method === 'agent') {
      updateData({
        agentId: item.id,
        agentName: item.name,
        agentLocation: item.location
      });
    } else if (data.method === 'atm') {
      updateData({ atmId: item.id });
    } else if (data.method === 'bank') {
      updateData({ bankAccount: item.account });
    }
  };

  const handleNext = () => {
    const hasSelection =
      (data.method === 'agent' && data.agentId) ||
      (data.method === 'atm' && data.atmId) ||
      (data.method === 'bank' && data.bankAccount);

    if (hasSelection) {
      onNext();
    }
  };

  const renderAgentList = () => (
    <div className="space-y-3">
      {mockAgents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => handleLocationSelect(agent)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            data.agentId === agent.id
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  agent.status === 'open'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {agent.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-2">{agent.location}</p>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{agent.distance}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>⭐</span>
                  <span>{agent.rating}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>💰</span>
                  <span>{agent.fee}</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <button className="text-blue-600 text-xs hover:underline">
                📞 Call
              </button>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderATMList = () => (
    <div className="space-y-3">
      {mockATMs.map((atm) => (
        <button
          key={atm.id}
          onClick={() => handleLocationSelect(atm)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            data.atmId === atm.id
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{atm.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{atm.location}</p>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{atm.distance}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>💰</span>
                  <span>{atm.fee}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700`}>
                  {atm.status}
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  const renderBankList = () => (
    <div className="space-y-3">
      {mockBanks.map((bank) => (
        <button
          key={bank.id}
          onClick={() => handleLocationSelect(bank)}
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            data.bankAccount === bank.account
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{bank.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Account: {bank.account}</p>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <span>💰</span>
                  <span>{bank.fee}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>⏱️</span>
                  <span>{bank.time}</span>
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl text-white">📍</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {data.method === 'agent' && 'Select Agent Point'}
          {data.method === 'atm' && 'Select ATM Location'}
          {data.method === 'bank' && 'Select Bank Account'}
        </h2>
        <p className="text-gray-600 text-sm">
          {data.method === 'agent' && 'Choose a nearby agent to collect your cash'}
          {data.method === 'atm' && 'Find the nearest ATM for withdrawal'}
          {data.method === 'bank' && 'Select your bank account for transfer'}
        </p>
      </div>

      {/* Search Bar (for agent/atm) */}
      {(data.method === 'agent' || data.method === 'atm') && (
        <div className="relative">
          <input
            type="text"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            placeholder="Search by location or area"
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
      )}

      {/* Location Lists */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium text-gray-900">
            {data.method === 'agent' && 'Nearby Agents'}
            {data.method === 'atm' && 'Nearby ATMs'}
            {data.method === 'bank' && 'Your Bank Accounts'}
          </h3>
          {(data.method === 'agent' || data.method === 'atm') && (
            <button className="text-sm text-red-600 hover:underline">
              📍 Use Current Location
            </button>
          )}
        </div>

        {data.method === 'agent' && renderAgentList()}
        {data.method === 'atm' && renderATMList()}
        {data.method === 'bank' && renderBankList()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={
            !((data.method === 'agent' && data.agentId) ||
              (data.method === 'atm' && data.atmId) ||
              (data.method === 'bank' && data.bankAccount))
          }
          className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default LocationStep;
