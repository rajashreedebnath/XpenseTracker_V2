import Button from '../Button';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';

export default function ExpenseForm({
  setIsOpen,
  expenseList,
  setExpenseList,
  editId,
  setBalance,
  balance,
}) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    date: '',
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (balance < Number(formData.price)) {
      enqueueSnackbar('Price should be less than the wallet balance', {
        variant: 'warning',
      });
      setIsOpen(false);
      return;
    }

    setBalance((prev) => prev - Number(formData.price));

    const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
    setExpenseList((prev) => [{ ...formData, id: lastId + 1 }, ...prev]);

    setFormData({
      title: '',
      category: '',
      price: '',
      date: '',
    });

    setIsOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const updated = expenseList.map((item) => {
      if (item.id === editId) {
        const priceDifference = item.price - Number(formData.price);

        if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
          enqueueSnackbar('Price should not exceed the wallet balance', {
            variant: 'warning',
          });
          setIsOpen(false);
          return { ...item };
        }

        setBalance((prev) => prev + priceDifference);
        return { ...formData, id: editId };
      } else {
        return item;
      }
    });

    setExpenseList(updated);
    setIsOpen(false);
  };

  useEffect(() => {
    if (editId) {
      const expenseData = expenseList.find((item) => item.id === editId);

      setFormData({
        title: expenseData.title,
        category: expenseData.category,
        price: expenseData.price,
        date: expenseData.date,
      });
    }
  }, [editId]);

  return (
    <div>
      <h3 className="text-[30px] mb-[10px] font-semibold">
        {editId ? 'Edit Expense' : 'Add Expenses'}
      </h3>

      <form
        onSubmit={editId ? handleEdit : handleAdd}
        className="grid grid-cols-1 sm:grid-cols-2 gap-[18px]"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="bg-[#FBFBFB] text-[#333] text-base p-3 rounded-[15px] shadow-md font-body w-full"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="bg-[#FBFBFB] text-[#333] text-base p-3 rounded-[15px] shadow-md font-body w-full"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="bg-[#FBFBFB] text-[#333] text-base p-3 rounded-[15px] shadow-md font-body w-full"
        >
          <option value="" disabled>
            Select category
          </option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="bg-[#FBFBFB] text-[#333] text-base p-3 rounded-[15px] shadow-md font-body w-full"
        />

        <div className="col-span-full flex flex-wrap gap-4">
          <Button type="submit" style="primary" shadow>
            {editId ? 'Edit Expense' : 'Add Expense'}
          </Button>

          <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
