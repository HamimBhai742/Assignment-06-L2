import { baseApi } from './baseApi';
export interface SendMoneyRequest {
  to: string;
  amount: number;
}
export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    withdrawMoney: builder.mutation({
      query: (amount: number) => ({
        url: '/wallet/withdraw-money',
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: ['User'],
    }),
    myWallet: builder.query({
      query: () => ({
        url: '/wallet/me',
        method: 'GET',
      }),
      providesTags: ['User', 'Agent'],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: '/wallet/send-money',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    cashIn: builder.mutation({
      query: (data) => ({
        url: '/wallet/cash-in',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Agent'],
    }),
    cashOut: builder.mutation({
      query: (data) => ({
        url: '/wallet/cash-out',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Agent'],
    }),
  }),
});

export const {
  useWithdrawMoneyMutation,
  useMyWalletQuery,
  useSendMoneyMutation,
  useCashInMutation,
  useCashOutMutation
} = walletApi;
