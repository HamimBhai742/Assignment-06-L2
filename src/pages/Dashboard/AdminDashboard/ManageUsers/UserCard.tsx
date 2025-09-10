import UserStatusBadge from './UserStatusBadge';
import UserActions from './UserActions';
import {
  PhoneIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import type { User } from './UserTable';
import { format } from 'timeago.js';
interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  console.log(user)
  return (
    <div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-300 group'>
      {/* Header */}
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center space-x-3'>
          <div className='h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium'>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className='font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
              {user?.name}
            </h3>
            <p className='text-xs text-gray-500 dark:text-gray-400'>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</p>
          </div>
        </div>
        <UserStatusBadge status={user?.isActive ? 'active' : 'blocked'} />
      </div>

      {/* Contact Info */}
      <div className='space-y-2 mb-4'>
        <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
          <PhoneIcon className='h-4 w-4' />
          <span>{user?.phone}</span>
        </div>
        <div className='flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400'>
          <ClockIcon className='h-4 w-4' />
          <span>{format(user?.createdAt)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className='flex justify-end'>
        <UserActions user={user} />
      </div>
    </div>
  );
};

export default UserCard;
