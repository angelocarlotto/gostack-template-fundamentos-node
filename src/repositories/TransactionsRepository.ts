import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce(
      (a, b) => a + (b.type === 'income' ? b.value : 0),
      0,
    );
    const outcome = this.transactions.reduce(
      (a, b) => a + (b.type === 'outcome' ? b.value : 0),
      0,
    );

    return { income, outcome, total: income - outcome };
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const obj = new Transaction({
      title,
      type,
      value,
    });
    this.transactions.push(obj);

    return obj;
  }
}

export default TransactionsRepository;
