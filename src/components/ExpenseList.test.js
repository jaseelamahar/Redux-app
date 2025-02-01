import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Provider } from 'react-redux';
import store from './store';
import ExpenseList from './ExpenseList';

test('renders "No expenses added yet" when no expenses are available', () => {
  render(
    <Provider store={store}>
      <ExpenseList />
    </Provider>
  );

  // Check if the "No expenses added yet" message is rendered when there are no expenses
  expect(screen.getByText('No expenses added yet')).toBeInTheDocument();
});
