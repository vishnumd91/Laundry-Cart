import React, {useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate('/signin', {state: location.pathname});
        return () => clearInterval(interval);

    }, [count, navigate, location]);
  return (
    <>
        <h1 style={{color: "red", textAlign: "center"}}>Redirecting you in {count} seconds</h1>
    </>
  )
}

export default Spinner
