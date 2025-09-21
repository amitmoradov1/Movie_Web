import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import usersData from '../data/Users.json';
import { useState } from 'react';

export default function Signup() {

    const usernameRef = React.createRef(null);
    const passwordRef = React.createRef(null)
    const againPasswordRef = React.createRef(null);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const [users,setUsers] = useState(usersData);

    const navigate = useNavigate();

    const checkDetails = () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const againPassword = againPasswordRef.current.value;

        if (password !== againPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }
        const exists = users.some(u => u.user === username);
        if (exists){
            setErrorMessage("The user is exist please change name of user");
            return false;
        }
        const newUser = { user: username, password: password };
        setUsers(prevUsers => [...prevUsers, newUser]);
        console.log(users);
        return true;
        // try {
        //     const res = await fetch("http://localhost:4000/userData", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(newUser),
        //     });

        //     if (!res.ok) {
        //     setErrorMessage("שגיאה בשמירה לשרת");
        //     return false;
        //     }

        //     setUsers(prevUsers => [...prevUsers, newUser]);
        //     setSuccessMessage("Signup successful!");
        //     return true;
        // }
        //     catch (err) {
        //         console.error("Error:", err);
        //         setErrorMessage("תקלה בהתחברות לשרת");
        //         return false;
        //     }
        
    }

    const  createUser = () => {
        setSuccessMessage('');
        setErrorMessage('');
        if(checkDetails())
            navigate('/');
        

    }
  return (
    <div className='login-container center'>
        <h1>Signup Page</h1>
        <p>please fill in the details to create an account.</p>
          {/* {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-100 text-center">
              {successMessage}
              
            </div> )} */}

                {/* {errorMessage && (
            <div className=" mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-xl text-red-100 text-center">
              {errorMessage}
              
            </div> )} */}
        <input ref={usernameRef} className='info-label' type="text" placeholder="Username" />
        <div>
        <input ref={passwordRef} className='info-label' type="password" placeholder="Password" />
        </div>
        <div>
        <input ref={againPasswordRef} className='info-label' type="password" placeholder="Again password" />
        </div>
        <button className="login-btn" onClick={() => createUser()}>Signup</button>
    </div>
  )
}
