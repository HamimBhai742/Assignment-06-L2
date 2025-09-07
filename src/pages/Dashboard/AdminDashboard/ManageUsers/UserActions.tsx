import { useState } from 'react';
import { 
  EllipsisVerticalIcon, 
  LockClosedIcon, 
  LockOpenIcon, 
  EyeIcon,
  TrashIcon 
} from '@heroicons/react/24/outline';
import ConfirmationModal from './ConfirmationModal';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked' | 'pending';
  balance: number;
  joinedAt: string;
  lastActive: string;
}

interface UserActionsProps {
  user: User;
  compact?: boolean;
}

const UserActions = ({ user, compact = false }: UserActionsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState<'block' | 'unblock' | 'delete' | null>(null);

  const handleAction = (action: string) => {
    setShowDropdown(false);
    
    switch (action) {
      case 'view':
        console.log('View user:', user.id);
        break;
      case 'block':
        setShowModal('block');
        break;
      case 'unblock':
        setShowModal('unblock');
        break;
      case 'delete':
        setShowModal('delete');
        break;
    }
  };

  const confirmAction = () => {
    console.log(`${showModal} user:`, user.id);
    // Here you would call the actual API
    setShowModal(null);
  };

  if (compact) {
    return (
      <>
        <div className="flex space-x-2">
          <button
            onClick={() => handleAction('view')}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="View Details"
          >
            <EyeIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleAction(user.status === 'active' ? 'block' : 'unblock')}
            className={`p-2 transition-colors ${
              user.status === 'active' 
                ? 'text-gray-400 hover:text-red-600' 
                : 'text-gray-400 hover:text-green-600'
            }`}
            title={user.status === 'active' ? 'Block User' : 'Unblock User'}
          >
            {user.status === 'active' ? (
              <LockClosedIcon className="h-4 w-4" />
            ) : (
              <LockOpenIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <ConfirmationModal
          isOpen={showModal !== null}
          onClose={() => setShowModal(null)}
          onConfirm={confirmAction}
          title={`${showModal === 'block' ? 'Block' : showModal === 'unblock' ? 'Unblock' : 'Delete'} User`}
          message={`Are you sure you want to ${showModal} ${user.name}?`}
          confirmText={showModal === 'delete' ? 'Delete' : showModal === 'block' ? 'Block' : 'Unblock'}
          confirmColor={showModal === 'delete' ? 'red' : showModal === 'block' ? 'red' : 'green'}
        />
      </>
    );
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <EllipsisVerticalIcon className="h-5 w-5" />
        </button>

        {showDropdown && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <div className="py-1">
                <button
                  onClick={() => handleAction('view')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <EyeIcon className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                
                {user.status === 'active' ? (
                  <button
                    onClick={() => handleAction('block')}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LockClosedIcon className="h-4 w-4" />
                    <span>Block User</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction('unblock')}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                  >
                    <LockOpenIcon className="h-4 w-4" />
                    <span>Unblock User</span>
                  </button>
                )}
                
                <button
                  onClick={() => handleAction('delete')}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                  <span>Delete User</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <ConfirmationModal
        isOpen={showModal !== null}
        onClose={() => setShowModal(null)}
        onConfirm={confirmAction}
        title={`${showModal === 'block' ? 'Block' : showModal === 'unblock' ? 'Unblock' : 'Delete'} User`}
        message={`Are you sure you want to ${showModal} ${user.name}?`}
        confirmText={showModal === 'delete' ? 'Delete' : showModal === 'block' ? 'Block' : 'Unblock'}
        confirmColor={showModal === 'delete' ? 'red' : showModal === 'block' ? 'red' : 'green'}
      />
    </>
  );
};

export default UserActions;
