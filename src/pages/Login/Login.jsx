import { useState } from 'react';
import "./Login.css";
import assets from '../../assets/assets';
import { signup ,login} from '../../config/Firebase';
import { resetPass } from '../../config/Firebase';

const Login = () => {
  const [currState, setCurrState] = useState("Signup");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (currState === "Signup") {
      signup(userName, email, password);
    }else{
      login(email,password)
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt='logo' className='logo'/>
      <form onSubmit={onSubmitHandler} className='login-form'>
        <h2>{currState}</h2>
        {currState === "Signup" ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type='text'
            placeholder='Username'
            className='form-input'
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          placeholder='Email-address'
          className='form-input'
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          placeholder='Password'
          className='form-input'
        />
        <button type='submit'>{currState === "Signup" ? "Create Account" : "Login"}</button>

        <div className='login-forgot'>
          {
            currState === "Signup" ? 
             <p className='login-toggle'>
              Already have an account? <span onClick={() => setCurrState("LogIn")}>Login here</span>
            </p>
           : 
            <p className='login-toggle'>
              Create an account? <span onClick={() => setCurrState("Signup")}>click here</span>
            </p>
          }
          {currState == "LogIn" ?  <p className='login-toggle'>
              Forgot Password? <span onClick={() => resetPass(email)}>Reset here</span>
            </p> : null}
        </div>
      </form>
    </div>
  );
};

export default Login;
