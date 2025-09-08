interface UserStatusBadgeProps {
  status: 'active' | 'blocked';
}

const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const statusConfig = {
    active: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      dot: 'bg-green-500',
      label: 'Active',
    },
    blocked: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      dot: 'bg-red-500',
      label: 'Blocked',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
    >
      <span className={`w-2 h-2 rounded-full mr-1.5 ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

export default UserStatusBadge;
