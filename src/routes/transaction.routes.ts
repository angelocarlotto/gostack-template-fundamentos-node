import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);
transactionRouter.get('/', (request, response) => {
  try {
    const balance = transactionsRepository.getBalance();
    const obj = {
      transactions: transactionsRepository.all(),
      balance,
    };
    return response.json(obj);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const obj = createTransactionService.execute({
      title: request.body.title,
      type: request.body.type,
      value: request.body.value,
    });

    return response.json(obj);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
