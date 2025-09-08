import { useState } from 'react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface AgentFilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const AgentFilterDropdown = ({ value, onChange }: AgentFilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 'all', label: 'All Status', count: null },
    { value: 'pending', label: 'Pending Approval', count: null },
    { value: 'approved', label: 'Approved', count: null },
    { value: 'suspended', label: 'Suspended', count: null },
  ];

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 sm:px-4 py-2.5 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto justify-between sm:justify-start"
      >
        <FunnelIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-700 truncate">
          {selectedOption?.label || 'Filter'}
        </span>
        <ChevronDownIcon className={`h-4 w-4 text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-full sm:w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                    value === option.value
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {option.count && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                      {option.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AgentFilterDropdown;
