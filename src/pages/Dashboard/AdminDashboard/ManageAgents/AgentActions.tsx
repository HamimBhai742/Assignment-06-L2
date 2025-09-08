import { useState } from 'react';
import {
  EllipsisVerticalIcon,
  CheckCircleIcon,
  XCircleIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import type { Agent } from './ManageAgents';
import {
  useApproveAgentMutation,
  useReactiveAgentMutation,
  useSuspendAgentMutation,
} from '../../../../redux/api/adminApi';
import toast from 'react-hot-toast';

interface AgentActionsProps {
  agent: Agent;
}

const AgentActions = ({ agent }: AgentActionsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [approveAgent, { isLoading }] = useApproveAgentMutation();
  const [suspendAgent, { isLoading: suspendLoading }] =
    useSuspendAgentMutation();
  const [reactivateAgent, { isLoading: reactivateLoading }] =
    useReactiveAgentMutation();
  const handleAction = async (action: string, id: string) => {
    console.log(action, id);
    if (action === 'approve') {
      console.log(id);
      const res = await approveAgent(id);
      if (res.data) {
        console.log(res.data);
        toast.success(res.data.message);
      }
      if (res.error) {
        const err = res.error as { data: { message: string } };
        toast.error(err.data.message);
      }
    } else if (action === 'suspend') {
      const res = await suspendAgent(id);
      if (res.data) {
        console.log(res.data);
        toast.success(res.data.message);
      }
      if (res.error) {
        const err = res.error as { data: { message: string } };
        toast.error(err.data.message);
      }
    } else if (action === 'reactivate') {
      const res = await reactivateAgent(id);
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

  const getActionButtons = () => {
    switch (agent.agentStatus) {
      case 'pending':
        return [
          {
            action: 'approve',
            icon: CheckCircleIcon,
            color: 'text-green-600',
            label: 'Approve',
          },
          {
            action: 'suspend',
            icon: XCircleIcon,
            color: 'text-red-600',
            label: 'Reject',
          },
        ];
      case 'approved':
        return [
          {
            action: 'suspend',
            icon: PauseIcon,
            color: 'text-red-600',
            label: 'Suspend',
          },
        ];
      case 'suspend':
        return [
          {
            action: 'reactivate',
            icon: PlayIcon,
            color: 'text-green-600',
            label: 'Reactivate',
          },
        ];
      default:
        return [];
    }
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
                {getActionButtons().map(
                  ({ action, icon: Icon, color, label }) => (
                    <button
                      key={action}
                      disabled={
                        isLoading || suspendLoading || reactivateLoading
                      }
                      onClick={() => handleAction(action, agent._id)}
                      className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${color} hover:bg-gray-50`}
                    >
                      <Icon className='h-4 w-4' />
                      <span>{label}</span>
                    </button>
                  )
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AgentActions;
