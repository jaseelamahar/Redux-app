import { useDispatch, useSelector } from 'react-redux';
import { expensesActions } from './store/expense';
import { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';  // Import file-saver to handle file download
import PremiumButton from './PremiumButton';
import ExpenseList from './ExpenseList';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalAmount);
  const isPremium = useSelector((state) => state.expense.isPremium);
  const expenses = useSelector((state) => state.expense.items); // Get expenses from Redux
  const [expense, setExpense] = useState({
    amount: '',
    description: '',
  });

  const url = 'https://expensetracker-bef3f-default-rtdb.firebaseio.com/expensesredux.json';

  // Fetch expenses from Firebase
  const fetchExpenses = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const expenses = [];
      for (const key in data) {
        expenses.push({
          id: key,
          ...data[key], // Assuming your Firebase data has `amount` and `description`
        });
      }
      // Dispatch the expenses data to Redux
      dispatch(expensesActions.setExpenses(expenses));
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [dispatch]);

  // Submit handler for adding new expense
  const submitHandler = (event) => {
    event.preventDefault();
    const expenseData = {
      ...expense,
      amount: +expense.amount, // Ensure the amount is a number
    };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(expenseData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(expensesActions.addExpense({ id: data.name, ...expenseData }));
      })
      .catch((error) => console.error('Error adding expense:', error));

    setExpense({ amount: '', description: '' });
  };

  // Function to download expenses as CSV
  const downloadCSV = () => {
    const headers = ['ID', 'Amount', 'Description'];
    const rows = expenses.map((expense) => [
      expense.id,
      expense.amount,
      expense.description,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";

    // Add headers
    csvContent += headers.join(',') + '\n';

    // Add rows
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    // Trigger file download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'expenses.csv');
    link.click();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          aria-label="amount" 
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        />
        <input
          type="text"
          value={expense.description}
          aria-label="description"
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        />
        <button type="submit">Add Expense</button>
      </form>
      <p>Total Amount: {totalAmount}</p>
      {/* Download CSV Button */}
      <button onClick={downloadCSV}>Download Expenses as CSV</button>

      {isPremium && <PremiumButton />}
      <ExpenseList />
    </div>
  );
};

export default ExpenseForm;
