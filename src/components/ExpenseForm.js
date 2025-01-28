import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { expensesActions } from './store/expense';
import PremiumButton from './PremiumButton'; // Import PremiumButton
import ExpenseList from './ExpenseList';

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector((state) => state.expense.totalAmount); // Get total expenses from Redux
  const isPremium = useSelector((state) => state.expense.isPremium);
  const [expense, setExpense] = useState({
    amount: '',
    description: '',
  });

  const url = 'https://expensetracker-bef3f-default-rtdb.firebaseio.com/expensesredux.json'; // Firebase URL (you may need to change to your specific endpoint)

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

  // Fetch expenses when the component mounts
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

    // You might also want to save the new expense to Firebase here
    fetch(url, {
      method: 'POST', // Add new expense to Firebase
      body: JSON.stringify(expenseData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // After successfully adding to Firebase, update Redux store
        dispatch(expensesActions.addExpense({ id: data.name, ...expenseData }));
      })
      .catch((error) => console.error('Error adding expense:', error));

    // Reset form after submission
    setExpense({ amount: '', description: '' });
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={expense.amount}
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        />
        <input
          type="text"
          value={expense.description}
          onChange={(e) => setExpense({ ...expense, description: e.target.value })}
        />
        <button type="submit">Add Expense</button>
      </form>

      {/* Conditionally render Premium Button inside ExpenseForm */}
      {isPremium && <PremiumButton />}
      <ExpenseList />
    </div>
  );
};

export default ExpenseForm;
