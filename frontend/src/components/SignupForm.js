import React, {useState} from 'react';
import '../styles/SignupForm.css';
import {Link, useNavigate} from 'react-router-dom';
import stateData from '../data/states-and-districts.json';
import axios from 'axios';
import toast from 'react-hot-toast';

function SignupForm() {
    //state variables
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState();
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [districtsList, setDistrictsList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [errors, setErrors] = useState({});
    
    const validateForm = () => {
        let errors = {};
        let isValid = true;
    
        if (!name.trim()) {
            errors.name = "Name is required";
            isValid = false;
        }
    
        if (!email.trim()) {
            errors.email = "Email is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Enter a valid email address";
            isValid = false;
        }
    
        if (!phone) {
            errors.phone = "Phone number is required";
            isValid = false;
        } else if (!/^\d{10}$/.test(phone)) {
            errors.phone = "Enter a valid 10-digit phone number";
            isValid = false;
        }
    
        if (!state) {
            errors.state = "State is required";
            isValid = false;
        }
    
        if (!district) {
            errors.district = "District is required";
            isValid = false;
        }
    
        if (!address.trim()) {
            errors.address = "Address is required";
            isValid = false;
        }
    
        if (!pincode) {
            errors.pincode = "Pincode is required";
            isValid = false;
        } else if (!/^\d{6}$/.test(pincode)) {
            errors.pincode = "Enter a valid 6-digit pincode";
            isValid = false;
        }
    
        if (!password) {
            errors.password = "Password is required";
            isValid = false;
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
            isValid = false;
        }
    
        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
            isValid = false;
        }
    
        if (!isChecked) {
            errors.isChecked = "You must accept the terms and conditions";
            isValid = false;
        }
    
        setErrors(errors);
        return isValid;
    };    

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        try{
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/users/register`, {name, email, phone, state, district, address, pincode, password});
            if(res && res.data.success){
                toast.success(res.data && res.data.message)
                navigate('/signin');
            }else{
                // console.log(res.data.message);
                toast.error(res.data.message);
            }
        }catch{
            // console.log("Something went wrong");
            toast.error("Something went wrong. Please try again.")
        }
    }

    const changeState = (e) => {
        setState(e.target.value);
        setDistrictsList(stateData.states.find(st => st.state === e.target.value).districts);
    }

  return (
    <>
        <div className='signup-form-container'>
            <p className='signup-text'>REGISTER</p>
            <form onSubmit={handleSubmit}>
                <div className='input-field-set'>
                    <div>
                        {name && <label className="floating-label">Name</label>}
                        <input type="text" name="name" className='input-field' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' required />
                        {errors.name && <p className="error-text">{errors.name}</p>}
                    </div>
                    <div>
                        {email && <label className="floating-label">Email</label>}
                        <input type="email" name='email' className='input-field' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />    
                        {errors.email && <p className="error-text">{errors.email}</p>}
                    </div>
                </div>
                <div className='input-field-set'>
                    <div>
                        {phone && <label className="floating-label">Phone</label>}
                        <input type="number" name="phone" className='input-field' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' required />    
                        {errors.phone && <p className="error-text">{errors.phone}</p>}
                    </div>
                    <div>
                        {state && <label className="floating-label">State</label>}
                        <select name='state' className='input-field' value={state} onChange={changeState} placeholder='State' required>
                            <option value="">State</option>
                            {stateData.states.map( st => 
                                <option value={st.state}>{st.state}</option>
                            )}
                        </select>
                        {errors.state && <p className="error-text">{errors.state}</p>}
                    </div>
                </div>
                <div className='input-field-set'>
                    <div>
                        {district && <label className="floating-label">District</label>}
                        <select name="district" className='input-field' value={district} onChange={(e) => setDistrict(e.target.value)} placeholder='District' required>
                            <option value="">District</option>
                            {districtsList.map(ds => 
                                <option value={ds}>{ds}</option>
                            )}  
                        </select>    
                        {errors.district && <p className="error-text">{errors.district}</p>}
                    </div>
                    <div>
                        {address && <label className="floating-label">Address</label>}
                        <input type="text" name='address' className='input-field' value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Address' required />
                        {errors.address && <p className="error-text">{errors.address}</p>}
                    </div>
                </div>
                <div className='input-field-set'>
                    <div>
                        {pincode && <label className="floating-label">Pincode</label>}
                        <input type="number" name="pincode" className='input-field' value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder='Pincode' required />    
                        {errors.pincode && <p className="error-text">{errors.pincode}</p>}
                    </div>
                    <div>
                        {password && <label className="floating-label">Password</label>}
                        <input type="password" name="password" className='input-field' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />    
                        {errors.password && <p className="error-text">{errors.password}</p>}
                    </div>
                </div>
                <div className='input-field-set'>
                    <div>
                        {confirmPassword && <label className="floating-label">Confirm Password</label>}
                        <input type="password" name="confirm-password" className='input-field' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} placeholder='Confirm Password' required />
                        {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
                    </div>
                    <div>
                        <div className='input-field'></div>
                    </div>
                </div>
                <div className='terms-field'>
                    <input type='checkbox' name='terms' checked={isChecked} onChange={() => setIsChecked(!isChecked)}/>
                    <Link to='' className='terms-text'>I agree to Terms & Condition receiving marketing and promotional materials</Link>
                </div>
                {errors.isChecked && <p className="error-text-terms">{errors.isChecked}</p>}
                <div className='btn-field'>
                    <button className='signup-btn'>Register</button>
                </div>
            </form>
        </div> 
    </>
  )
}

export default SignupForm
