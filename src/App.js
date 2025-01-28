import { useSelector } from 'react-redux';
import Counter from './components/Counter';
import Auth from './components/Auth';
import { Fragment } from 'react';
import Header from "./components/Header";
import UserProfile from "./components/UserProfile"
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';


function App() {
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  return (
    <Fragment>
      <Header/>

      {!isAuth && <Auth/>}
      {isAuth && <UserProfile/>  && <ExpenseForm/> }
    <Counter />
    
     </Fragment>
     
  );
}

export default App;