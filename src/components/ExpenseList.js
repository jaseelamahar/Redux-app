import { useSelector } from 'react-redux';

const ExpenseList = () => {
  const expenses = useSelector((state) => state.expense.items);
 // console.log(expenses) 

  return (
    <>
    <h3 style={{ color: 'white' }}>Expense List:</h3>
    <ul>
      {expenses.length > 0 ? (
        expenses.map((expense, index) => (
          <li key={expense.id || index}  style={{color:'white'}}> {/* Use index if id is missing */}
            {expense.description} - ₹{expense.amount}
          </li>
        ))
      ) : (
        <li>No expenses added yet</li>
      )}
    </ul>
    </>
  );
};

export default ExpenseList;
