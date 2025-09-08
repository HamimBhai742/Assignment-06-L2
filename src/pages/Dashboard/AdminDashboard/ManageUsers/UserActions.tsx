import { useState } from 'react';
import {
  EllipsisVerticalIcon,
  LockClosedIcon,
  LockOpenIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import type { User } from './UserTable';
import {
  useDeleteUserMutation,
  useManageUsersMutation,
} from '../../../../redux/api/adminApi';
import toast from 'react-hot-toast';

interface UserActionsProps {
  user: User;
}

const UserActions = ({ user }: UserActionsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [blockUnblockuser] = useManageUsersMutation();
  const [deleteUser] = useDeleteUserMutation();
  const handleAction = async (action: string, id: string) => {
    const se = {
      id: id,
      status: action,
    };
    if (action === 'block' || action === 'unblock') {
      const res = await blockUnblockuser(se);
      if (res.data) {
        console.log(res.data);
        toast.success(res.data.message);
      }
      if (res.error) {
        const err = res.error as { data: { message: string } };
        toast.error(err.data.message);
      }
    }

    if (action === 'delete') {
      const res = await deleteUser(id);
      if (res.data) {
        console.log(res.data);
        toast.success(res.data.message);
      }
      if (res.error) {
        const err = res.error as { data: { message: string } };
        toast.error(err.data.message);
      }
    }
    setShowDropdown(false);
  };
  return (
    <>
      <div className='relative'>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className='p-2 text-gray-400 hover:text-gray-600 transition-colors'
        >
          <EllipsisVerticalIcon className='h-5 w-5' />
        </button>

        {showDropdown && (
          <>
            <div
              className='fixed inset-0 z-10'
              onClick={() => setShowDropdown(false)}
            />
            <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20'>
              <div className='py-1'>
                {user.isActive ? (
                  <button
                    onClick={() => handleAction('block', user._id)}
                    className='flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                  >
                    <LockClosedIcon className='h-4 w-4' />
                    <span>Block</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAction('unblock', user._id)}
                    className='flex items-center space-x-2 w-full px-4 py-2 text-sm text-green-600 hover:bg-green-50'
                  >
                    <LockOpenIcon className='h-4 w-4' />
                    <span>Unblock</span>
                  </button>
                )}

                <button
                  onClick={() => handleAction('delete', user._id)}
                  className='flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                >
                  <TrashIcon className='h-4 w-4' />
                  <span>Delete User</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserActions;
