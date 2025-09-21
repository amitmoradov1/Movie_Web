import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'

export default function Signup() {

    const passwordRef = React.createRef(null)
    const againPasswordRef = React.createRef(null);

    const navigate = useNavigate();

    const checkDetails = () => {
        if (passwordRef.current.value !== againPasswordRef.current.value) {
            alert('Passwords do not match');
            return false;
        }
        //TO DO: add validation for signup details
        alert('Signup successful');
        return true;
    }

    const handleSignup = () => {
        if (checkDetails()){
            navigate('/');
        }

    }
  return (
    <div className='login-container center'>
        <h1>Signup Page</h1>
        <p>please fill in the details to create an account.</p>
        <input className='info-label' type="text" placeholder="Username" />
        <div>
        <input ref={passwordRef} className='info-label' type="password" placeholder="Password" />
        </div>
        <div>
        <input ref={againPasswordRef} className='info-label' type="password" placeholder="Again password" />
        </div>
        <button className="login-btn" onClick={handleSignup}>Signup</button>
    </div>
  )
}
