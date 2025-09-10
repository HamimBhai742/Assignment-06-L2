import AgentStatusBadge from './AgentStatusBadge';
import AgentActions from './AgentActions';
import type { Agent } from './ManageAgents';
import { format } from 'timeago.js';
interface AgentTableProps {
  agents: Agent[];
}

const AgentTable = ({ agents }: AgentTableProps) => {
  console.log(agents);
  return (
    <div className='overflow-x-auto -mx-4 sm:mx-0'>
      <div className='inline-block min-w-full align-middle'>
        <table className='min-w-full'>
          <thead className='bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
            <tr>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Agent
              </th>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Status
              </th>
              <th className='hidden xl:table-cell px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Joined
              </th>
              <th className='px-3 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'>
            {agents.map((agent) => (
              <tr
                key={agent._id}
                className='hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
              >
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                  <div className='flex items-center'>
                    <div className='h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-xs sm:text-sm'>
                      {agent.name.charAt(0).toUpperCase()}
                    </div>
                    <div className='ml-2 sm:ml-4'>
                      <div className='text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[120px] sm:max-w-none'>
                        {agent.name}
                      </div>
                      <div className='text-xs sm:text-sm text-gray-500 dark:text-gray-400'>
                        {agent.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
                  <AgentStatusBadge status={agent.agentStatus} />
                </td>
                <td className='hidden xl:table-cell px-6 py-4 whitespace-nowrap'>
                  <div className='text-xs text-gray-500 dark:text-gray-400'>
                    {format(agent.createdAt)}
                  </div>
                </td>
                <td className='px-3 sm:px-6 py-4 whitespace-nowrap'>
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
