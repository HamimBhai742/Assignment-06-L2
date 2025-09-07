import UserStatusBadge from './UserStatusBadge';
import UserActions from './UserActions';
import { formatDistanceToNow } from 'date-fns';
import { EnvelopeIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked' | 'pending';
  balance: number;
  joinedAt: string;
  lastActive: string;
  avatar?: string;
}

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {user.name}
            </h3>
            <p className="text-xs text-gray-500">ID: {user.id}</p>
          </div>
        </div>
        <UserStatusBadge status={user.status} />
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <EnvelopeIcon className="h-4 w-4" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <PhoneIcon className="h-4 w-4" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ClockIcon className="h-4 w-4" />
          <span>{formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })}</span>
        </div>
      </div>

      {/* Balance */}
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="text-xs text-gray-500 mb-1">Current Balance</div>
        <div className="text-lg font-bold text-gray-900">
          ৳{user.balance.toLocaleString()}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <UserActions user={user} compact />
      </div>
    </div>
  );
};

export default UserCard;
