import { useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'blocked' | 'pending';
  balance: number;
  joinedAt: string;
  lastActive: string;
}

export const useDemoUsersData = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers([
        {
          id: 'USR001',
          name: 'Ahmed Rahman',
          email: 'ahmed.rahman@email.com',
          phone: '+880 1712-345678',
          status: 'active',
          balance: 15750,
          joinedAt: '2024-01-15',
          lastActive: '2024-09-07T10:30:00Z'
        },
        {
          id: 'USR002',
          name: 'Fatima Khatun',
          email: 'fatima.khatun@email.com',
          phone: '+880 1823-456789',
          status: 'active',
          balance: 8920,
          joinedAt: '2024-02-20',
          lastActive: '2024-09-07T09:15:00Z'
        },
        {
          id: 'USR003',
          name: 'Mohammad Ali',
          email: 'mohammad.ali@email.com',
          phone: '+880 1934-567890',
          status: 'blocked',
          balance: 2340,
          joinedAt: '2024-01-08',
          lastActive: '2024-09-06T14:20:00Z'
        },
        {
          id: 'USR004',
          name: 'Rashida Begum',
          email: 'rashida.begum@email.com',
          phone: '+880 1645-678901',
          status: 'active',
          balance: 25680,
          joinedAt: '2024-03-12',
          lastActive: '2024-09-07T11:45:00Z'
        },
        {
          id: 'USR005',
          name: 'Karim Uddin',
          email: 'karim.uddin@email.com',
          phone: '+880 1756-789012',
          status: 'pending',
          balance: 0,
          joinedAt: '2024-09-05',
          lastActive: '2024-09-05T16:30:00Z'
        },
        {
          id: 'USR006',
          name: 'Nasir Ahmed',
          email: 'nasir.ahmed@email.com',
          phone: '+880 1867-890123',
          status: 'active',
          balance: 12450,
          joinedAt: '2024-02-28',
          lastActive: '2024-09-07T08:20:00Z'
        },
        {
          id: 'USR007',
          name: 'Salma Akter',
          email: 'salma.akter@email.com',
          phone: '+880 1978-901234',
          status: 'blocked',
          balance: 5670,
          joinedAt: '2024-01-22',
          lastActive: '2024-09-04T12:10:00Z'
        },
        {
          id: 'USR008',
          name: 'Ibrahim Hossain',
          email: 'ibrahim.hossain@email.com',
          phone: '+880 1589-012345',
          status: 'active',
          balance: 18920,
          joinedAt: '2024-03-05',
          lastActive: '2024-09-07T10:55:00Z'
        }
      ]);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { data: users, isLoading };
};
