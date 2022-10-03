import { ApiService } from './api.service';

const URL = '/transaction';

const TransactionService = {
  async makeTransactionr(data) {
    return await ApiService.post(URL, data);
  }
};

export default TransactionService;
