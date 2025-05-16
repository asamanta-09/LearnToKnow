import React, { useState } from "react";
import styles from "../css/NewPassword.module.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'

import { IonIcon } from "@ionic/react";
import { lockClosedOutline, logoFirebase } from "ionicons/icons";

function NewPasswordTeacher() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
      return;
    }

    try {
      const res = await axios.post('/teacher/passwordUpdate', { email, password }, { withCredentials: true });
      if (res.data.success) {
        navigate('/teachers/login');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Error in updating password:', error);
      alert("Something went wrong while updating the password");
    }
  };


  return (
    <div>
      <header className={styles.newpassword_header}>
        <Link to="#" className={styles.newpassword_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>
        <nav className={styles.newpassword_nav}>
          <Link to="#">Home</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="/teachers/signup">Sign Up</Link>
        </nav>
      </header>

      <section className={styles.newpassword_home}>
        <div className={styles.newpassword_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>
            “Knowledge is the seed, learning is the rain.
            With patience and curiosity, wisdom blooms.
            A mind open to learning is a garden that never withers.”
          </p>
          <Link to="#">Get Started</Link>
        </div>

        <div className={styles.newpassword_wrapper_login}>
          <h2>Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.newpassword_input_box}>
              <span className={styles.newpassword_icon}>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <input type="password" id="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password">New Password</label>
            </div>
            <div className={styles.newpassword_input_box}>
              <span className={styles.newpassword_icon}>
                <IonIcon icon={lockClosedOutline} />
              </span>
              <input type="password" id="confirmpassword" value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>
            <button type="submit" className={styles.newpassword_btn}> Update </button>
            <div className={styles.newpassword_register_link}>
              <p>
                Go back to Login? <Link to="/teachers/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default NewPasswordTeacher;
