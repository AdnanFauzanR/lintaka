import React, { useState } from "react";
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from './../../components/Button/Button';

const Login = () => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState([]);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('wilayah', response.data.wilayah);
            localStorage.setItem('role', response.data.role);

            navigate('/BerandaPengaduan');
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
  }

  return(
    <div className="login-container">
        <div className='header-logo-container'>
            <div>
                <img src="assets/logo-gowa.svg"/>
            </div>
            <div>
                <img src="assets/logo-metro.svg"/>
            </div>
        </div>
        <div className="logo-app-container">
            <div>
                <img src="assets/lintaka.svg"/>
            </div>
        </div>
        <div className="login-content-container">
            <h1>Login Admin</h1>
            {
                validation.message && (
                    <div className="alert-danger">
                  {validation.message}
                </div>
              )
            }
            <div className="login-form-container">
            <h3>Username</h3>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Masukkan Username"/>
            {
              validation.username && (
                <div className="alert-danger">
                  {validation.username[0]}
                </div>
              )
            }
            <h3>Password</h3>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan Password"/>
            {
              validation.password && (
                <div className="alert-danger">
                  {validation.password[0]}
                </div>
              )
            }
            </div>
            <div className="login-button-container">
                <button type="submit" onClick={loginHandler}>Login</button>
            </div>
        </div>
    </div>
  );
}

export default Login;