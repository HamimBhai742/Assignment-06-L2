import type { PaginationProps } from "../intrefaces";


const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  setItemsPerPage,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) return null;

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
      <div className='flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0'>
        {/* Results Info */}
        <div className='text-sm text-gray-600 dark:text-gray-300'>
          Showing <span className='font-medium text-gray-900 dark:text-white'>{startItem}</span>{' '}
          to <span className='font-medium text-gray-900 dark:text-white'>{endItem}</span> of{' '}
          <span className='font-medium text-gray-900 dark:text-white'>{totalItems}</span>{' '}
          transactions
        </div>

        {/* Pagination Controls */}
        <div className='flex items-center space-x-2'>
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className='hidden sm:flex items-center space-x-1'>
            {getVisiblePages().map((page, index) => (
              <div key={index}>
                {page === '...' ? (
                  <span className='px-3 py-2 text-sm text-gray-500 dark:text-gray-400'>...</span>
                ) : (
                  <button
                    onClick={() => onPageChange(page as number)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 dark:bg-blue-700 text-white'
                        : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Page Info */}
          <div className='sm:hidden px-3 py-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg'>
            Page {currentPage} of {totalPages}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 hover:text-gray-700 dark:hover:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            Next →
          </button>
        </div>

        {/* Items Per Page (Optional) */}
        <div className='hidden lg:flex items-center space-x-2'>
          <span className='text-sm text-gray-600 dark:text-gray-300'>Show:</span>
          <select
            onClick={(e) =>
              setItemsPerPage(parseInt((e.target as HTMLSelectElement).value))
            }
            className='px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
            defaultValue={itemsPerPage}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className='text-sm text-gray-600 dark:text-gray-300'>per page</span>
        </div>
      </div>

      {/* Quick Jump (for large datasets) */}
      {totalPages > 10 && (
        <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-600'>
          <div className='flex items-center justify-center space-x-2'>
            <span className='text-sm text-gray-600 dark:text-gray-300'>Jump to page:</span>
            <input
              type='number'
              min={1}
              max={totalPages}
              className='w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const page = parseInt((e.target as HTMLInputElement).value);
                  if (page >= 1 && page <= totalPages) {
                    onPageChange(page);
                  }
                }
              }}
            />
            <span className='text-sm text-gray-600 dark:text-gray-300'>of {totalPages}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagination;
