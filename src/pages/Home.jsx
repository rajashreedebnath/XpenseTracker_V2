import { useEffect, useState } from "react";
import MoneyCard from "../components/MoneyCard";
import TransactionLog from "../components/TransactionLog";
import ExpenseForm from "../components/Forms/ExpenseForm";
import Modal from "../components/Modal";
import AddBalanceForm from "../components/Forms/AddBalanceForm";
import PieChart from "../components/PieChart";
import BarChart from "../components/BarChart";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  const [categorySpends, setCategorySpends] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  const [categoryCount, setCategoryCount] = useState({
    food: 0,
    entertainment: 0,
    travel: 0,
  });

  useEffect(() => {
    const localBalance = localStorage.getItem("balance");
    if (localBalance) {
      setBalance(Number(localBalance));
    } else {
      setBalance(5000);
      localStorage.setItem("balance", 5000);
    }

    const items = JSON.parse(localStorage.getItem("expenses"));
    setExpenseList(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) {
      localStorage.setItem("expenses", JSON.stringify(expenseList));
    }

    if (expenseList.length > 0) {
      setExpense(
        expenseList.reduce(
          (acc, curr) => acc + Number(curr.price),
          0
        )
      );
    } else {
      setExpense(0);
    }

    let foodSpends = 0,
      entertainmentSpends = 0,
      travelSpends = 0;
    let foodCount = 0,
      entertainmentCount = 0,
      travelCount = 0;

    expenseList.forEach((item) => {
      if (item.category === "food") {
        foodSpends += Number(item.price);
        foodCount++;
      } else if (item.category === "entertainment") {
        entertainmentSpends += Number(item.price);
        entertainmentCount++;
      } else if (item.category === "travel") {
        travelSpends += Number(item.price);
        travelCount++;
      }
    });

    setCategorySpends({
      food: foodSpends,
      travel: travelSpends,
      entertainment: entertainmentSpends,
    });

    setCategoryCount({
      food: foodCount,
      travel: travelCount,
      entertainment: entertainmentCount,
    });
  }, [expenseList]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("balance", balance);
    }
  }, [balance]);

  return (
    <div className="bg-[#3B3B3B] p-6 min-h-screen">
      <h1 className="text-white mb-2 text-2xl sm:text-3xl text-center sm:text-left">
        Expense Tracker
      </h1>

      {/* Cards and PieChart */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 sm:p-12 bg-[#626262] rounded-[10px] shadow-md mb-8">
        <MoneyCard
          title="Wallet Balance"
          money={balance}
          buttonText="+ Add Income"
          buttonType="success"
          handleClick={() => setIsBalanceModalOpen(true)}
        />

        <MoneyCard
          title="Expenses"
          money={expense}
          buttonText="+ Add Expense"
          buttonType="failure"
          success={false}
          handleClick={() => setIsExpenseModalOpen(true)}
        />

        <PieChart
          data={[
            ["Category", "Expenditure"],
            ["Food", categorySpends.food],
            ["Entertainment", categorySpends.entertainment],
            ["Travel", categorySpends.travel],
          ]}
        />
      </div>

      {/* Transactions and BarChart */}
      <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-8">
        <TransactionLog
          transactions={expenseList}
          editTransactions={setExpenseList}
          title="Recent Transactions"
          balance={balance}
          setBalance={setBalance}
        />

        <BarChart
          data={[
            { name: "Food", value: categorySpends.food },
            { name: "Entertainment", value: categorySpends.entertainment },
            { name: "Travel", value: categorySpends.travel },
          ]}
        />
      </div>

      {/* Modals */}
      <Modal isOpen={isExpenseModalOpen} setIsOpen={setIsExpenseModalOpen}>
        <ExpenseForm
          setIsOpen={setIsExpenseModalOpen}
          expenseList={expenseList}
          setExpenseList={setExpenseList}
          setBalance={setBalance}
          balance={balance}
        />
      </Modal>

      <Modal isOpen={isBalanceModalOpen} setIsOpen={setIsBalanceModalOpen}>
        <AddBalanceForm
          setIsOpen={setIsBalanceModalOpen}
          setBalance={setBalance}
        />
      </Modal>
    </div>
  );
}

