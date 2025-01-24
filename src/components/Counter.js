import {  useSelector,useDispatch } from 'react-redux'
import classes from './Counter.module.css';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  
  const toggleCounterHandler=()=>{}

  const incrementhandler = () => {
dispatch({type:'increment'})
  };

  const decrementhandler = () => {
dispatch({type:'decrement'})
    
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={incrementhandler}>Increment by 5</button>
      <button onClick={decrementhandler}>Decrement by 5</button>
      <div>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
  );
};

export default Counter;
