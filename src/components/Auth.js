import classes from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import { useState} from 'react';

const Auth = () => {
  const dispatch=useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginHandler=async(event)=>{
event.preventDefault()
try {
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=
AIzaSyCRMglR7ak9G5dE_8p6N-oGQYlY5caXLcs`, 
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password ,returnSecureToken: true,}),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error.message || 'Login failed!');
  }
  

  const data = await response.json();
  console.log('Response Data:', data); // Log the response for debugging

  // Dispatch token and userId to the Redux store
  dispatch(
    authActions.login({
      token: data.idToken,
      userId: data.localId,
    })
  );

  console.log('Login Successful:', data);
} catch (error) {
  console.error('Error logging in:', error.message);
}
  }

  
  
  return (
    <main className={classes.auth}>
      <section>
        <form>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' 
             value={email}
             onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={loginHandler}>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
