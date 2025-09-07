interface ISenderReceiver {
  _id: string;
  name: string;
  phone: string;
  role: string;
}
export interface Transaction {
  _id?: string;
  type: 'add_money' | 'send_money' | 'receive_money' | 'cash_out' | 'deposit' | 'withdraw' | 'fee' | 'commission';
  transactionId: string;
  amount: number;
  to?: ISenderReceiver;
  from?: ISenderReceiver;
  status: 'completed' | 'pending' | 'failed';
  updatedAt: string;
  createdAt: string;
  fee: number;
  commission: number;
}