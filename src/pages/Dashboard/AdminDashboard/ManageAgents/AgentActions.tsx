import { useState } from 'react';
import { 
  EllipsisVerticalIcon, 
  CheckCircleIcon, 
  XCircleIcon, 
  EyeIcon,
  PauseIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import AgentConfirmationModal from './AgentConfirmationModal';

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

interface AgentActionsProps {
  agent: Agent;
  compact?: boolean;
}

const AgentActions = ({ agent, compact = false }: AgentActionsProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState<'approve' | 'suspend' | 'reactivate' | null>(null);

  const handleAction = (action: string) => {
    setShowDropdown(false);
    
    switch (action) {
      case 'view':
        console.log('View agent:', agent.id);
        break;
      case 'approve':
        setShowModal('approve');
        break;
      case 'suspend':
        setShowModal('suspend');
        break;
      case 'reactivate':
        setShowModal('reactivate');
        break;
    }
  };

  const confirmAction = () => {
    console.log(`${showModal} agent:`, agent.id);
    // Here you would call the actual API
    setShowModal(null);
  };

  const getActionButtons = () => {
    switch (agent.status) {
      case 'pending':
        return [
          { action: 'approve', icon: CheckCircleIcon, color: 'text-green-600', label: 'Approve' },
          { action: 'suspend', icon: XCircleIcon, color: 'text-red-600', label: 'Reject' }
        ];
      case 'approved':
        return [
          { action: 'suspend', icon: PauseIcon, color: 'text-red-600', label: 'Suspend' }
        ];
      case 'suspended':
        return [
          { action: 'reactivate', icon: PlayIcon, color: 'text-green-600', label: 'Reactivate' }
        ];
      default:
        return [];
    }
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
          {getActionButtons().map(({ action, icon: Icon, color }) => (
            <button
              key={action}
              onClick={() => handleAction(action)}
              className={`p-2 transition-colors hover:${color} ${color.replace('text-', 'text-gray-400 hover:text-')}`}
              title={action.charAt(0).toUpperCase() + action.slice(1)}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <AgentConfirmationModal
          isOpen={showModal !== null}
          onClose={() => setShowModal(null)}
          onConfirm={confirmAction}
          action={showModal}
          agent={agent}
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
                
                {getActionButtons().map(({ action, icon: Icon, color, label }) => (
                  <button
                    key={action}
                    onClick={() => handleAction(action)}
                    className={`flex items-center space-x-2 w-full px-4 py-2 text-sm ${color} hover:bg-gray-50`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <AgentConfirmationModal
        isOpen={showModal !== null}
        onClose={() => setShowModal(null)}
        onConfirm={confirmAction}
        action={showModal}
        agent={agent}
      />
    </>
  );
};

export default AgentActions;
