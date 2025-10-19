import React, { createRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../styles/App.css'
import { useState } from 'react';

export default function Signup() {

    const usernameRef = React.createRef(null);
    const passwordRef = React.createRef(null)
    const againPasswordRef = React.createRef(null);
    const email = createRef(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);



    const navigate = useNavigate();
    const checkDetails = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const againPassword = againPasswordRef.current.value;
        const emailValue = email.current.value;

        if (!username || !password || !againPassword || !emailValue) {
          setErrorMessage('All fields are required');
          setShowErrorMessage(true);
          return false;
    }
        if (password !== againPassword) {
            setErrorMessage('Passwords do not match');
            console.error("Passwords do not match");
            return false;
        }

        if (emailValue.trim() === '' || !emailValue.includes('@')) {
            setErrorMessage('Invalid email address');
            console.error("Invalid email address");
            return false;
        }

        // const newUser = { user: username, password: password };
        // const updatedUsers = [...users, newUser];
        // localStorage.setItem('users', JSON.stringify(updatedUsers));
        // setUsers(updatedUsers);
        // setSuccessMessage("Signup successful!");
        // console.log(updatedUsers);
        // return true;
         try {
        const res = await fetch("http://localhost:4000/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username ,password, email: emailValue }),
        });
          const data = await res.json();

            if (!res.ok ) {
            setErrorMessage("Failed to signup");
            setShowErrorMessage(true);
            console.log("Signup failed with status:", res.status);
            return false;
            }

            if (res.status === 201) {
            setShowSuccessMessage(true);
            setSuccessMessage("Signup successful");
            return true;
            }
          
        }
            catch (err) {
                console.log("Error:", err);
                setErrorMessage("An error occurred during signup");
                setShowErrorMessage(true);
                console.error("Signup error:", err);
                return false;
            }
    }

    const  createUser = async () => {
        setSuccessMessage('');
        setErrorMessage('');
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
        const ok = await checkDetails(); 
        console.log(`ok = ${ok}`);
        // i want to wait 3 seconds and then remove the message
            setTimeout(() => {
            setShowSuccessMessage(false);
            setShowErrorMessage(false);
            }, 3000);
    }

  return (
    <div className='login-container center'>
        <h2 >הרשמה</h2>
        <p>please fill in the details to create an account.</p>
          {showSuccessMessage && (
            <div className="success-popup">
              {successMessage}
              
            </div> )}

                {showErrorMessage && (
            <div className="error-popup">
              {errorMessage}
              
            </div> )}
        <input ref={usernameRef} className='info-label' type="text" placeholder="Username" />
        <div>
          <input ref={email} type='email' className='info-label' placeholder='Email' />
        </div>
        <div>
        <input ref={passwordRef} className='info-label' type="password" placeholder="Password" />
        </div>
        <div>
        <input ref={againPasswordRef} className='info-label' type="password" placeholder="Again password" />
        </div>
        <button className="login-btn" onClick={() => createUser()}>הרשמה</button>
        <Link  to="/">חזרה</Link>

    </div>
  )
}
