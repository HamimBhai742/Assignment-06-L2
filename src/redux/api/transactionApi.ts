import { apiSlice } from './apiSlice';
import { baseApi } from './baseApi';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'cashout' | 'cashin' | 'payment';
  amount: number;
  recipient?: string;
  sender?: string;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

interface SendMoneyRequest {
  recipient: string;
  amount: number;
  pin: string;
  description?: string;
}

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => '/transactions',
      // Simulate API response
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockTransactions: Transaction[] = [
          {
            id: '1',
            type: 'send',
            amount: 500,
            recipient: '01812345678',
            description: 'Lunch money',
            status: 'completed',
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            type: 'receive',
            amount: 1000,
            sender: '01912345678',
            description: 'Payment received',
            status: 'completed',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ];

        return { data: mockTransactions };
      },
      providesTags: ['Transaction'],
    }),

    sendMoney: builder.mutation<Transaction, SendMoneyRequest>({
      query: (data) => ({
        url: '/transactions/send',
        method: 'POST',
        body: data,
      }),
      // Simulate API response
      queryFn: async (data) => {
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (data.pin !== '1234') {
          return {
            error: {
              status: 400,
              data: { message: 'Invalid PIN' },
            },
          };
        }

        const transaction: Transaction = {
          id: Date.now().toString(),
          type: 'send',
          amount: data.amount,
          recipient: data.recipient,
          description: data.description || 'Money transfer',
          status: 'completed',
          createdAt: new Date().toISOString(),
        };

        return { data: transaction };
      },
      invalidatesTags: ['Transaction', 'User'],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useSendMoneyMutation,
} = transactionApi;
