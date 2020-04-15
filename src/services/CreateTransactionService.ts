import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, value, title }: Omit<Transaction, 'id'>): Transaction {
    const { income, outcome } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && income - outcome < value) {
      throw Error('nao tem saudo');
    }

    const obj = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return obj;
  }
}

export default CreateTransactionService;
