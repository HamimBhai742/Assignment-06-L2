import { useState, useEffect } from 'react';

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

export const useDemoAgentsData = () => {
  const [agents, setAgents] = useState<Agent[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAgents([
        {
          id: 'AGT001',
          agentId: 'AG001',
          name: 'Md. Rafiqul Islam',
          email: 'rafiqul.islam@email.com',
          phone: '+880 1712-345678',
          status: 'pending',
          balance: 45000,
          commission: 2850,
          location: 'Dhanmondi, Dhaka',
          shopName: 'Rafiq General Store',
          joinedAt: '2024-09-05',
          lastActive: '2024-09-07T10:30:00Z',
          totalTransactions: 0
        },
        {
          id: 'AGT002',
          agentId: 'AG002',
          name: 'Fatema Khatun',
          email: 'fatema.khatun@email.com',
          phone: '+880 1823-456789',
          status: 'approved',
          balance: 125000,
          commission: 15750,
          location: 'Gulshan, Dhaka',
          shopName: 'Fatema Mobile Shop',
          joinedAt: '2024-02-15',
          lastActive: '2024-09-07T11:15:00Z',
          totalTransactions: 1247
        },
        {
          id: 'AGT003',
          agentId: 'AG003',
          name: 'Abdul Karim',
          email: 'abdul.karim@email.com',
          phone: '+880 1934-567890',
          status: 'approved',
          balance: 89000,
          commission: 12340,
          location: 'Chittagong',
          shopName: 'Karim Electronics',
          joinedAt: '2024-01-20',
          lastActive: '2024-09-07T09:45:00Z',
          totalTransactions: 892
        },
        {
          id: 'AGT004',
          agentId: 'AG004',
          name: 'Nasir Ahmed',
          email: 'nasir.ahmed@email.com',
          phone: '+880 1645-678901',
          status: 'suspended',
          balance: 25000,
          commission: 3200,
          location: 'Sylhet',
          shopName: 'Nasir Pharmacy',
          joinedAt: '2024-03-10',
          lastActive: '2024-09-04T14:20:00Z',
          totalTransactions: 456
        },
        {
          id: 'AGT005',
          agentId: 'AG005',
          name: 'Rashida Begum',
          email: 'rashida.begum@email.com',
          phone: '+880 1756-789012',
          status: 'pending',
          balance: 0,
          commission: 0,
          location: 'Rajshahi',
          shopName: 'Rashida Tailoring Shop',
          joinedAt: '2024-09-06',
          lastActive: '2024-09-06T16:30:00Z',
          totalTransactions: 0
        },
        {
          id: 'AGT006',
          agentId: 'AG006',
          name: 'Mohammad Hasan',
          email: 'mohammad.hasan@email.com',
          phone: '+880 1867-890123',
          status: 'approved',
          balance: 156000,
          commission: 18920,
          location: 'Khulna',
          shopName: 'Hasan Grocery',
          joinedAt: '2024-01-08',
          lastActive: '2024-09-07T08:20:00Z',
          totalTransactions: 1589
        },
        {
          id: 'AGT007',
          agentId: 'AG007',
          name: 'Salma Akter',
          email: 'salma.akter@email.com',
          phone: '+880 1978-901234',
          status: 'approved',
          balance: 78000,
          commission: 9850,
          location: 'Barisal',
          shopName: 'Salma Beauty Parlor',
          joinedAt: '2024-02-28',
          lastActive: '2024-09-07T10:55:00Z',
          totalTransactions: 734
        },
        {
          id: 'AGT008',
          agentId: 'AG008',
          name: 'Ibrahim Khalil',
          email: 'ibrahim.khalil@email.com',
          phone: '+880 1589-012345',
          status: 'pending',
          balance: 0,
          commission: 0,
          location: 'Rangpur',
          shopName: 'Khalil Hardware',
          joinedAt: '2024-09-04',
          lastActive: '2024-09-04T12:10:00Z',
          totalTransactions: 0
        }
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { data: agents, isLoading };
};
