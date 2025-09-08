import UserStatusBadge from './UserStatusBadge';
import UserActions from './UserActions';
import { formatDistanceToNow } from 'date-fns';

export interface User {
  _id: string;
  name: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  role: 'user';
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <div className='overflow-x-auto -mx-4 sm:mx-0'>
      <div className='inline-block min-w-full align-middle'>
        <table className='min-w-full'>
          <thead className='bg-gray-50 border-b border-gray-200'>
            <tr>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                User
              </th>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Role
              </th>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Joined
              </th>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {users?.map((user) => (
              <tr key={user._id} className='hover:bg-gray-50 transition-colors'>
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-xs sm:text-sm'>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className='ml-2 sm:ml-4'>
                      <div className='text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none'>
                        {user.name}
                      </div>
                      <div className='text-xs sm:text-sm text-gray-500'>
                        {user.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                  <div className='text-sm w-fit font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full'>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </div>
                </td>
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                  <UserStatusBadge
                    status={user.isActive ? 'active' : 'blocked'}
                  />
                </td>
                <td className='hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {formatDistanceToNow(new Date(user.createdAt), {
                    addSuffix: true,
                  })}
                </td>
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                  <UserActions user={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
