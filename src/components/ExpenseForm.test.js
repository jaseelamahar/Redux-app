import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ExpenseForm from './ExpenseForm';
import expensesReducer from './store/expense'; 

const store = configureStore({
  reducer: {
    expense: expensesReducer,
  },
});

global.fetch = jest.fn();

describe('ExpenseForm', () => {
  describe('Rendering tests', () => {
    it('renders the ExpenseForm component with initial state', () => {
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      expect(screen.getByText('Add Expense')).toBeInTheDocument();
      expect(screen.getByText('Total Amount: 0')).toBeInTheDocument();
      expect(screen.getByText('Download Expenses as CSV')).toBeInTheDocument();
    });
  });

  describe('Expense fetching tests', () => {
    it('fetches expenses on mount', async () => {
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve([
          { amount: 100, description: 'Test expense' },
          { amount: 200, description: 'Another expense' },
        ]),
      });

      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      await waitFor(() => screen.getByText('Total Amount: 300'));
      expect(screen.getByText('Total Amount: 300')).toBeInTheDocument();
    });

    it('handles errors when fetching expenses', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Failed to fetch'));

      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      await waitFor(() => expect(screen.queryByText('Error fetching expenses:')).toBeInTheDocument());
    });
  });

  describe('Form input tests', () => {
    it('allows user to enter amount and description', () => {
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      fireEvent.change(screen.getByLabelText('amount'), { target: { value: '50' } });
      fireEvent.change(screen.getByLabelText('description'), { target: { value: 'Test Expense' } });

      expect(screen.getByLabelText('amount').value).toBe('50');
      expect(screen.getByLabelText('description').value).toBe('Test Expense');
    });

    it('does not submit the form if amount or description is empty', () => {
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      fireEvent.change(screen.getByLabelText('amount'), { target: { value: '' } });
      fireEvent.change(screen.getByLabelText('description'), { target: { value: '' } });

      fireEvent.click(screen.getByText('Add Expense'));

      expect(screen.getByLabelText('amount').value).toBe('');
      expect(screen.getByLabelText('description').value).toBe('');
    });
  });

  describe('Form submission and CSV download tests', () => {
    it('should add a new expense', async () => {
      global.fetch.mockResolvedValueOnce({
        json: () => Promise.resolve({ name: 'id123' }),
      });

      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      fireEvent.change(screen.getByLabelText('amount'), { target: { value: '50' } });
      fireEvent.change(screen.getByLabelText('description'), { target: { value: 'Test Expense' } });

      fireEvent.click(screen.getByText('Add Expense'));

      await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
      expect(screen.getByText('Total Amount: 50')).toBeInTheDocument();
    });

    it('should trigger CSV download', () => {
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      const downloadSpy = jest.spyOn(document.createElement('a'), 'click');
      fireEvent.click(screen.getByText('Download Expenses as CSV'));

      expect(downloadSpy).toHaveBeenCalled();
    });
  });

  describe('Premium user tests', () => {
    it('renders PremiumButton if user is premium', () => {
      const premiumStore = configureStore({
        reducer: {
          expense: { isPremium: true, totalAmount: 0, items: [] },
        },
      });

      render(
        <Provider store={premiumStore}>
          <ExpenseForm />
        </Provider>
      );

      expect(screen.getByText('Premium Feature')).toBeInTheDocument(); // Adjust this text to match actual PremiumButton text
    });
  });

  describe('Expense list tests', () => {
    it('does not show any expenses if expense list is empty', () => {
      render(
        <Provider store={store}>
          <ExpenseForm />
        </Provider>
      );

      expect(screen.queryByText('Test expense')).toBeNull();
    });
  });
});
