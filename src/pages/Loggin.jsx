import React, { useState, useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import style from '../styles/login.module.css';
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
    <div className={style['login-page']}>
      <div className={style['login-container']}>
        <h2 className={style['card-title']}>התחברות</h2>

        <input
          className={style['login-input']}
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={style['login-input']}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={style['login-btn']} onClick={checkLogin}>
          התחבר
        </button>

        <div className={style['login-footer']}>
          <p>
            עדיין אין לך חשבון?{" "}
            <Link to="/signup" className={style['signup-link']}>
              צור חשבון
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
