import React, { useState, useContext } from 'react'
import '../styles/App.css'
import { Link,useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
//import usersData from '../data/Users.json';

export default function Loggin(props) {

    const [name, setName] = useState('');
    const [password,setPassword] = useState('');
    const { userId, setUserId } = useContext(UserContext);

    const navigate = useNavigate();

    const checkLogin = async () => {

       try {
        const res = await fetch("http://localhost:4000/loggin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, password }),
        });
        
        if (res.ok) {
            const data = await res.json();
            console.log("Login successful:", data);
            setUserId(data.user._id);
            console.log("Logged in user ID:", userId);
            props.show.setIsShowingLogin(false);
            props.show.setIsShowingMovie(true);
            alert('Welcome ' + name);

            navigate('/gallery');

        }
        else {
            alert('Login failed');
            setName('');
            setPassword('');
        }
        } catch (err) {
            console.log("Error:", err);
            alert('An error occurred during login');
        }
    }

  return (
    <div className='login-container center'>
        <h2 className='card-title '>התחברות</h2>
        <input className='info-label' type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input className='info-label' type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="login-btn" onClick={checkLogin}>התחבר</button>

        <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
               עדיין אין לך חשבון?{" "}
          <Link to="/signup">צור חשבון</Link>
              </p>
            </div>
    </div>
  )
}
