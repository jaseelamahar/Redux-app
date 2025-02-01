import { render, screen, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux'; 
import store from './store';
import ExpenseForm from './ExpenseForm'; 


test('form resets after submitting an expense', () => {
    render(
      <Provider store={store}>
        <ExpenseForm />
      </Provider>
    );
  
    const amountInput = screen.getByLabelText('amount');
    const descriptionInput = screen.getByLabelText('description');
    const submitButton = screen.getByText('Add Expense');
  
    // Simulate entering data into the form
    fireEvent.change(amountInput, { target: { value: '200' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Reset' } });
  
    // Submit the form
    fireEvent.click(submitButton);
  
    // Ensure the form fields are reset
    expect(amountInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });
  
  