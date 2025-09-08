import AgentStatusBadge from './AgentStatusBadge';
import AgentActions from './AgentActions';
import { formatDistanceToNow } from 'date-fns';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  BuildingStorefrontIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

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

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-3">
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0">
            {agent.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base truncate">
              {agent.name}
            </h3>
            <p className="text-xs text-gray-500">ID: {agent.agentId}</p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <AgentStatusBadge status={agent.status} />
        </div>
      </div>

      {/* Business Info */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-3 mb-4">
        <div className="flex items-center text-sm font-medium text-gray-900 mb-1">
          <BuildingStorefrontIcon className="h-4 w-4 mr-2 text-green-600 flex-shrink-0" />
          <span className="truncate">{agent.shopName}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <MapPinIcon className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
          <span className="truncate">{agent.location}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <EnvelopeIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{agent.email}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <PhoneIcon className="h-4 w-4 flex-shrink-0" />
          <span>{agent.phone}</span>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Balance</div>
          <div className="text-sm font-bold text-gray-900 truncate">
            ৳{agent.balance.toLocaleString()}
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-1">Commission</div>
          <div className="text-sm font-bold text-green-600 truncate">
            ৳{agent.commission.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ChartBarIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{agent.totalTransactions} transactions completed</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ClockIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">Last active: {formatDistanceToNow(new Date(agent.lastActive), { addSuffix: true })}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <AgentActions agent={agent} compact />
      </div>
    </div>
  );
};

export default AgentCard;
