import { useState, useEffect } from 'react';

interface AdminStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  userGrowth: number;
  agentGrowth: number;
  transactionGrowth: number;
  volumeGrowth: number;
  todayTransactions: number;
  todayVolume: number;
  activeUsers: number;
  avgTransactionValue: number;
  transactionChart: Array<{
    month: string;
    transactions: number;
    volume: number;
  }>;
  volumeDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export const useDemoAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 12547,
        totalAgents: 1834,
        totalTransactions: 45623,
        totalVolume: 2847593,
        userGrowth: 12.5,
        agentGrowth: 8.3,
        transactionGrowth: 15.7,
        volumeGrowth: 23.4,
        todayTransactions: 1247,
        todayVolume: 89500,
        activeUsers: 3420,
        avgTransactionValue: 1850,
        transactionChart: [
          { month: 'Jan', transactions: 3200, volume: 185000 },
          { month: 'Feb', transactions: 3800, volume: 220000 },
          { month: 'Mar', transactions: 4200, volume: 245000 },
          { month: 'Apr', transactions: 3900, volume: 235000 },
          { month: 'May', transactions: 4500, volume: 280000 },
          { month: 'Jun', transactions: 5100, volume: 320000 },
          { month: 'Jul', transactions: 4800, volume: 295000 },
          { month: 'Aug', transactions: 5300, volume: 340000 },
          { month: 'Sep', transactions: 4900, volume: 315000 },
          { month: 'Oct', transactions: 5600, volume: 365000 },
          { month: 'Nov', transactions: 5200, volume: 335000 },
          { month: 'Dec', transactions: 5800, volume: 385000 },
        ],
        volumeDistribution: [
          { name: 'Send Money', value: 1250000, color: '#3B82F6' },
          { name: 'Cash In', value: 850000, color: '#10B981' },
          { name: 'Cash Out', value: 520000, color: '#F59E0B' },
          { name: 'Bill Payment', value: 227593, color: '#8B5CF6' },
        ],
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { data: stats, isLoading };
};
