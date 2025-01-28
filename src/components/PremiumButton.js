import { useSelector } from 'react-redux';

const PremiumButton = () => {
  const isPremium = useSelector((state) => state.expense.isPremium);

  return isPremium && <button>Activate Premium</button>;
};

export default PremiumButton;
