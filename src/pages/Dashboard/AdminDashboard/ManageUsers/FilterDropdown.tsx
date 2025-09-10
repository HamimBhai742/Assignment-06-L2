import { useState } from 'react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
}

const FilterDropdown = ({ value, onChange, options }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className='relative'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center space-x-2 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      >
        <FunnelIcon className='h-5 w-5 text-gray-400 dark:text-white' />
        <span className='text-sm font-medium text-gray-700 dark:text-white' >
          {selectedOption?.label || 'Filter'}
        </span>
        <ChevronDownIcon
          className={`h-4 w-4 text-gray-400 dark:text-white transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className='fixed inset-0 z-10'
            onClick={() => setIsOpen(false)}
          />
          <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:border rounded-lg shadow-lg border border-gray-200 z-20'>
            <div className='py-1'>
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full dark:text-white text-left px-4 py-2 text-sm transition-colors ${
                    value === option.value
                      ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-blue-400'
                      : 'text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 '
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;
