import React from 'react';
import '../styles/SigninForm.css';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useUser } from '../context/user';

function SigninForm() {

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const validateCredentials = (input) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/

    if(phonePattern.test(input) || emailPattern.test(input)){
      setError("");  
    }else{
      setError("Please enter a valid Email or Phone");
    }
  }

  const handleChange = (e) => {
      const input = e.target.value;
      setCredential(input);
      validateCredentials(input);
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/login`, {credential, password});
        if(res && res.data.success){
          toast.success(res.data && res.data.message);
          setUser({
            ...user,
            currUser: res.data.user,
            token: res.data.token
          })
          localStorage.setItem("currUser", JSON.stringify(res.data));
          navigate(location.state || '/');
        }else{
          toast.error("Wrong Password");
        }
      
    }catch{
      // console.log("Something went wrong");
      toast.error("Something went Wrong");
    }
  }
  return (
    <>
      <div className='signin-form-container'>
        <p className='signin-text'>SIGN IN</p>
        <form onSubmit={handleSignin}>

            {credential && <label className="floating-label" style={{marginLeft: "1.5vw"}}>Mobile / Email</label>}
            <div className={({error} ? 'mobile-or-email-input error' : 'mobile-or-email-input')}>
                <input type="text" name="mobile-or-email" onChange={handleChange} placeholder='Mobile / Email' required style={{width: "100%"}}/>
            </div>
            {error && <p className='errMsg' style={{color: "#EF1A1A"}}>{error}</p>}
                        
            {password && <label className="floating-label" style={{marginLeft: "1.5vw"}}>Password</label>}
            <div className='password-field'>
                <input type={showPassword ? "text" : "password"} name="password" className='password-input' onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
                <p className='padlock' onClick={() => setShowPassword(!showPassword)}></p>
            </div>
          
            <Link to='/forgotpassword' className='message'>Forget Password?</Link>
          
            <div className='signin-btn-container'>
              <button className='signin-btn'>Sign In</button>
            </div>
            
        </form>
      </div>
    </>
  )
}

export default SigninForm
