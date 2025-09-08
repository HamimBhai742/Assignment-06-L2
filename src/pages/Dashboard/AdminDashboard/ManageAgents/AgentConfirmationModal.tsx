import { XMarkIcon, CheckCircleIcon, XCircleIcon, PlayIcon } from '@heroicons/react/24/outline';

interface Agent {
  id: string;
  agentId: string;
  name: string;
  shopName: string;
  status: 'pending' | 'approved' | 'suspended';
}

interface AgentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: 'approve' | 'suspend' | 'reactivate' | null;
  agent: Agent;
}

const AgentConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  action,
  agent
}: AgentConfirmationModalProps) => {
  if (!isOpen || !action) return null;

  const actionConfig = {
    approve: {
      title: 'Approve Agent',
      message: `Are you sure you want to approve ${agent.name} (${agent.shopName}) as an agent? They will be able to perform cash-in and cash-out transactions.`,
      confirmText: 'Approve',
      color: 'green' as const,
      icon: CheckCircleIcon
    },
    suspend: {
      title: agent.status === 'pending' ? 'Reject Agent Application' : 'Suspend Agent',
      message: agent.status === 'pending' 
        ? `Are you sure you want to reject ${agent.name}'s agent application? This action cannot be undone.`
        : `Are you sure you want to suspend ${agent.name} (${agent.shopName})? They will not be able to perform any transactions.`,
      confirmText: agent.status === 'pending' ? 'Reject' : 'Suspend',
      color: 'red' as const,
      icon: XCircleIcon
    },
    reactivate: {
      title: 'Reactivate Agent',
      message: `Are you sure you want to reactivate ${agent.name} (${agent.shopName})? They will be able to perform transactions again.`,
      confirmText: 'Reactivate',
      color: 'green' as const,
      icon: PlayIcon
    }
  };

  const config = actionConfig[action];
  const Icon = config.icon;

  const colorClasses = {
    red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
  };

  const iconColorClasses = {
    red: 'bg-red-100 text-red-600',
    green: 'bg-green-100 text-green-600'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${iconColorClasses[config.color]}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Agent Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                {agent.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900">{agent.name}</div>
                <div className="text-sm text-gray-600">{agent.shopName}</div>
                <div className="text-xs text-gray-500">ID: {agent.agentId}</div>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{config.message}</p>

          <div className="flex space-x-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${colorClasses[config.color]}`}
            >
              {config.confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentConfirmationModal;
