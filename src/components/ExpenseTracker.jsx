import { React, useState } from 'react';
import MoneyCard from './MoneyCard';
import BarChart from './BarChart';
import PieChart from './PieChart';
import TransactionLog from './TransactionLog';
import { useSnackbar } from 'notistack';

const ExpenseTracker = () => {
  const [balance, setBalance] = useState(5000);
  const [transactions, setTransactions] = useState([]);
  const [expense, setExpense] = useState(0);

  const expenseData = [
    ['category', 'expenditure'],
    ['Food', 4350],
    ['Entertainment', 5600],
    ['Travel', 7894],
  ];

  return (
    <>
      <h1 className="text-2xl font-bold text-white mb-4">Expense Tracker</h1>

      <div className="h-[17rem] bg-[#626262] flex justify-around items-center rounded-[10px] mb-6 flex-wrap gap-4">
        <MoneyCard
          type={'balance'}
          amount={balance}
          buttonClickHandler={() => {}}
        />
        <MoneyCard
          type={'expense'}
          amount={expense}
          buttonClickHandler={() => {}}
        />
        <PieChart data={expenseData} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-8">
        <TransactionLog transactions={transactions} />
        <BarChart data={expenseData} />
      </div>
    </>
  );
};

export default ExpenseTracker;
