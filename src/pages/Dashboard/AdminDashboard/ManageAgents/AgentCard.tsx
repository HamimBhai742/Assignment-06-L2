import AgentStatusBadge from './AgentStatusBadge';
import AgentActions from './AgentActions';
import { ClockIcon } from '@heroicons/react/24/outline';
import type { Agent } from './ManageAgents';
import { format } from 'timeago.js';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-all duration-300 group'>
      {/* Header */}
      <div className='flex items-start justify-between mb-4 gap-3'>
        <div className='flex items-center space-x-3 min-w-0 flex-1'>
          <div className='h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm flex-shrink-0'>
            {agent.name.charAt(0).toUpperCase()}
          </div>
          <div className='min-w-0 flex-1'>
            <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base truncate'>
              {agent.name}
            </h3>
            <p className='text-xs text-gray-500'>{agent.phone}</p>
          </div>
        </div>
        <div className='flex-shrink-0'>
          <AgentStatusBadge status={agent.agentStatus} />
        </div>
      </div>

      {/* Activity Stats */}
      <div className='space-y-2 mb-4'>
        <div className='flex items-center space-x-2 text-sm text-gray-600'>
          <ClockIcon className='h-4 w-4 flex-shrink-0' />
          <span className='truncate'>Joined: {format(agent.createdAt)}</span>
        </div>
      </div>
      {/* Actions */}
      <div className='flex justify-end'>
        <AgentActions agent={agent} />
      </div>
    </div>
  );
};

export default AgentCard;
