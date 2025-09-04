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
      providesTags: ['User'],
    }),
    sendMoney: builder.mutation({
      query: (data) => ({
        url: '/wallet/send-money',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useWithdrawMoneyMutation, useMyWalletQuery,useSendMoneyMutation } = walletApi;
