import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/send-recovery-email`, {email});           
            // console.log("response of update password: ", res);
            if(res && res.data.success){
                toast.success(res.data.message);
                navigate('/signin');
            }else{
                // toast.error("Error Updating Password");
                toast.error(res.data.message);
            }    
        } catch (error) {
            // console.error("Error response:", error.response); 
            toast.error(error.response?.data?.message || "Something went wrong");
        }
        
    }

    const validateEmail = (input) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailPattern.test(input)){
            setError("Please enter valid Email");
        }else{
            setError("");
        }
    } 

    const handleChange = (e) => {
        const input = e.target.value;
        setEmail(input);
        validateEmail(input);
    }

  return (
    <>
        <div className='signin-form-container' style={{margin: "0 29vw 0 29vw"}}>
            <p className='signin-text'>FORGOT PASSWORD</p>
            <form onSubmit={handleSubmit}>

                {email && <label className="floating-label" style={{marginLeft: "1.5vw"}}>Email</label>}
                <div className='input-field'>
                    <input type="text" name="email" onChange={handleChange} placeholder='Email' required />
                </div>
                {error && <p className='errMsg' style={{color: "#EF1A1A"}}>{error}</p>}
                                        
                <div className='signin-btn-container'>
                <button className='signin-btn' style={{margin: "15vh"}}>Proceed</button>
                </div>
                
            </form>
        </div>
    </>
  )
}

export default ForgotPassword
