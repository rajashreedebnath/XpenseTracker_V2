import Button from '../Button';
import { useState } from 'react';
import { useSnackbar } from 'notistack';

export default function AddBalanceForm({ setIsOpen, setBalance }) {
  const [income, setIncome] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(income) < 0) {
      enqueueSnackbar("Income should be greater than 0", { variant: "warning" });
      setIsOpen(false);
      return;
    }

    setBalance((prev) => prev + Number(income));
    setIsOpen(false);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Add Balance</h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-4 max-sm:flex-col"
      >
        <input
          type="number"
          placeholder="Income Amount"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
          className="bg-[#FBFBFB] text-[#333] text-base p-3 rounded-lg shadow-md font-body w-full sm:w-auto"
        />

        <Button type="submit" style="primary" shadow>
          Add Balance
        </Button>

        <Button
          style="secondary"
          shadow
          handleClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}
