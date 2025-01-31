import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { cartActions } from './store/cart';


const Header = () => {
  const dispatch=useDispatch()
  const isAuth=useSelector(state=>state.auth.isAuthenticated)
  const showCart = useSelector(state => state.cart.showcart)
  const logoutHandler=(event)=>{
    event.preventDefault();
    dispatch(authActions.logout())
  }
  const showCartHandler=()=>{
    dispatch(cartActions.toggleCart()); 
  }
  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuth &&( <nav>
        <ul>
          <li>
            <a href='/'>My Products</a>
          </li>
          <li>
            <a href='/'>My Sales</a>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
          <li>
            <button onClick={showCartHandler}> {showCart ? "Hide Cart" : "Your Cart"}</button>
          </li>
        </ul>
      </nav>)
}
    </header>
  );
};

export default Header;
