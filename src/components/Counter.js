import {  useSelector,useDispatch } from 'react-redux'
import classes from './Counter.module.css';
import { counterActions } from './store/counter';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter.counter);
  const show=useSelector(state=>state.showCounter)
  
  const toggleCounterHandler=()=>{
    dispatch({type:'toggle'})
  }

  const incrementhandler = () => {
dispatch(counterActions.increment(5))
  };

  const decrementhandler = () => {
dispatch(counterActions.decrement(5))
    
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
   { show && <div className={classes.value}>{counter}</div>}
      <button onClick={incrementhandler}>Increment by 5</button>
      <button onClick={decrementhandler}>Decrement by 5</button>
      <div>
        <button onClick={toggleCounterHandler}>Toggle Counter</button>
      </div>
    </main>
  );
};

export default Counter;
