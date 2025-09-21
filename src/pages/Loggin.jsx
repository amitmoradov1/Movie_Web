import React, { useState } from 'react'
import '../styles/App.css'
import { Link,useNavigate } from 'react-router-dom';
import usersData from '../data/Users.json';

export default function Loggin(props) {

    const [name, setName] = useState('');
    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    const checkLogin = () => {
        if (usersData.find(u => u.user === name && u.password === password)) {
            alert('Login successful');
            props.show.setIsShowingLogin(false);
           props.show.setIsShowingMovie(true);
            navigate('/gallery');

        }
        else {
            alert('Login failed');
            setName('');
            setPassword('');
        }
    }

  return (
    <div className='login-container center'>
        <h2 className='card-title '>Login</h2>
        <input className='info-label' type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
        <br />
        <input className='info-label' type="password" placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button className="login-btn" onClick={checkLogin}>Login</button>

        <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
               עדיין אין לך חשבון?{" "}
          <Link to="/signup">צור חשבון</Link>
              </p>
            </div>
    </div>
  )
}
