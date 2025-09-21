import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'

export default function Signup() {

    const navigate = useNavigate();

    const checkDetails = () => {
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
        <input className='info-label' type="password" placeholder="Password" />
        </div>
        <div>
        <input className='info-label' type="password" placeholder="Again password" />
        </div>
        <button className="login-btn" onClick={handleSignup}>Signup</button>
    </div>
  )
}
