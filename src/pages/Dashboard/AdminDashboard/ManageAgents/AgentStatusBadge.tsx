interface AgentStatusBadgeProps {
  status: 'pending' | 'approved' | 'suspended';
}

const AgentStatusBadge = ({ status }: AgentStatusBadgeProps) => {
  const statusConfig = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      dot: 'bg-yellow-500',
      label: 'Pending'
    },
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
      label: 'Approved'
    },
    suspended: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-500',
      label: 'Suspended'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      <span className={`w-2 h-2 rounded-full mr-1.5 ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

export default AgentStatusBadge;
