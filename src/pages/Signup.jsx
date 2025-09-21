import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/App.css'
import usersData from '../data/Users.json';
import { useState } from 'react';

export default function Signup() {

    const usernameRef = React.createRef(null);
    const passwordRef = React.createRef(null)
    const againPasswordRef = React.createRef(null);


    const [users,setUsers] = useState(usersData);

    const navigate = useNavigate();

    const checkDetails = async () => {
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const againPassword = againPasswordRef.current.value;

        if (password !== againPassword) {
            alert('Passwords do not match');
            return false;
        }
        const exists = users.some(u => u.user === username);
        if (exists){
            alert("The user is exist please change name of user");
            return false;
        }
        const newUser = { user: username, password: password };
        setUsers(prevUsers => [...prevUsers, newUser]);
        try {
            const res = await fetch("http://localhost:4000/userData", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
            });

            if (!res.ok) {
            alert("שגיאה בשמירה לשרת");
            return false;
            }

            alert("Signup successful!");
            return true;
        }
            catch (err) {
                console.error("Error:", err);
                alert("תקלה בהתחברות לשרת");
                return false;
            }
        
    }

    const  createUser = () => {
        if(checkDetails())
            navigate('/');
        

    }
  return (
    <div className='login-container center'>
        <h1>Signup Page</h1>
        <p>please fill in the details to create an account.</p>
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
