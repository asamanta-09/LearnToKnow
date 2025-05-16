import React, { useState } from "react";
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline, logoFirebase } from 'ionicons/icons';

import styles from "../css/LoginForm.module.css";

import { toast } from 'react-toastify';
import { useEffect } from 'react';

function LoginPageTeacher() { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

   useEffect(() => {
    toast.success("Successfull");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/teacher/login', { email, password }, { withCredentials: true });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        navigate('/teachers/home');
      } else {
        setError("Login failed. Please check your credentials.");
      }

    } catch (error) {
      console.error('Error sending login data:', error);
      setError("Invalid email or password. Please try again.");
    }
  };


  return (
    <div>
      <header className={styles.login_header}>
        <Link to="#" className={styles.login_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>
        <nav className={styles.login_nav}>
          <Link to="#">Home</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="/teachers/signup">Sign Up</Link>
        </nav>
      </header>

      <section className={styles.login_home}>
        <div className={styles.login_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>“Knowledge is the seed, learning is the rain.With patience and curiosity, wisdom blooms.A mind open to learning is a garden that never withers.”</p>
          <Link to="/teachers/signup">Get Started</Link>
        </div>
        <div className={styles.login_wrapper_login}>
          <h2>Teacher Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.login_input_box}>
              <span className={styles.login_icon}>
                <IonIcon icon={mailOutline} />
              </span>
              <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Enter your email</label>
            </div>
            <div className={styles.login_input_box}>
              <span className={styles.login_icon}>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <input type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">Enter your password</label>
            </div>
            <div className={styles.login_remember_forgot}>
              <label> <input type="checkbox" /> Remember me </label>
              <Link to="/teachers/forget-password">Forgot Password?</Link> 
            </div>
            {/* Error message display */}
            {error && <p className={styles.login_error_message}>{error}</p>}
            <button type="submit" className={styles.login_btn}> Login </button>
            <div className={styles.login_register_link}>
              <p> Not a member? <Link to="/teachers/signup">Sign Up</Link> </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default LoginPageTeacher;
