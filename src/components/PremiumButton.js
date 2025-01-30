import { useDispatch } from 'react-redux';
import { expensesActions } from './store/expense';
import { themeActions } from './store/theme'; // Import theme actions

const PremiumButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // Dispatch the toggle premium action
    dispatch(expensesActions.togglePremium());  

    // If user reaches premium, enable dark theme
    dispatch(themeActions.toggleTheme());  // Switch to dark theme
  };

  return <button>Activate Premium</button>;
};

export default PremiumButton;
