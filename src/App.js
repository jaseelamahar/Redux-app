import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { themeActions } from './components/store/theme'; // Import the theme actions
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import ExpenseForm from './components/ExpenseForm';
import PremiumButton from './components/PremiumButton';
import Counter from './components/Counter';
import Auth from './components/Auth';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const { theme } = useSelector((state) => state.theme); // Get current theme from Redux
  const isPremium = useSelector((state) => state.expense.isPremium);

  return (
    <div
      style={{
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#000' : '#fff',
        height: '100vh',
        transition: '0.3s ease-in-out',
      }}
    >
      <Fragment>
        <Header />
        
        {!isAuth && <Auth />}
        {isAuth && (
          <>
            <UserProfile />
            <ExpenseForm />

          </>
        )}
        
      

        
        {/* Only show theme toggle if the user is premium */}
        {isPremium && (
          <button onClick={() => dispatch(themeActions.toggleTheme())}>
            Toggle Theme
          </button>
        )}

        <Counter />
      </Fragment>
    </div>
  );
}

export default App;
