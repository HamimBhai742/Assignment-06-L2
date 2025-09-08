import AgentStatusBadge from './AgentStatusBadge';
import AgentActions from './AgentActions';
import { formatDistanceToNow } from 'date-fns';
import { MapPinIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

interface Agent {
  id: string;
  agentId: string;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'suspended';
  balance: number;
  commission: number;
  location: string;
  shopName: string;
  joinedAt: string;
  lastActive: string;
  totalTransactions: number;
}

interface AgentTableProps {
  agents: Agent[];
}

const AgentTable = ({ agents }: AgentTableProps) => {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th className="hidden sm:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="hidden lg:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="hidden xl:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                      {agent.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-2 sm:ml-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">{agent.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">ID: {agent.agentId}</div>
                      <div className="sm:hidden text-xs text-gray-500 truncate max-w-[120px]">{agent.shopName}</div>
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{agent.email}</div>
                  <div className="text-sm text-gray-500">{agent.phone}</div>
                </td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900 mb-1">
                    <BuildingStorefrontIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {agent.shopName}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                    {agent.location}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    ৳{agent.balance.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Comm: ৳{agent.commission.toLocaleString()}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <AgentStatusBadge status={agent.status} />
                </td>
                <td className="hidden xl:table-cell px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {agent.totalTransactions} transactions
                  </div>
                  <div className="text-xs text-gray-500">
                    Last active: {formatDistanceToNow(new Date(agent.lastActive), { addSuffix: true })}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <AgentActions agent={agent} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentTable;
