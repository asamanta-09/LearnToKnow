import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify';

import { IonIcon } from "@ionic/react";
import { logoFirebase, keyOutline, arrowBackOutline } from "ionicons/icons";

import styles from "../css/enterotp.module.css";

function PasswordOTPTeacher() {
  const [otp, setOTP] = useState("");
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/teacher/verifyOTP', { email, otp }, { withCredentials: true })
      .then((response) => {
        if (response.data.success === true) {
          toast.success("OTP verified");
          navigate('/teachers/reset-password', { state: { email } });
        } else {
          toast.warn(response.data.message);
          throw new Error("Invalid OTP");
        }
      })
      .catch((error) => {
        console.error('Error during OTP verification:', error);
      });
  };

  return (
    <div>
      <header className={styles.enterotp_header}>
        <Link to="#" className={styles.enterotp_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>
        <nav className={styles.enterotp_nav}>
          <Link to="#">Home</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="/teachers/signup">Sign Up</Link>
        </nav>
      </header>

      <section className={styles.enterotp_home}>
        <div className={styles.enterotp_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>
            “Knowledge is the seed, learning is the rain.
            With patience and curiosity, wisdom blooms.
            A mind open to learning is a garden that never withers.”
          </p>
          <Link to="#">Get Started</Link>
        </div>

        <div className={styles.enterotp_wrapper_login}>
          <h2>Forget Password</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.enterotp_input_box}>
              <span className={styles.enterotp_icon}>
                <IonIcon icon={keyOutline} />
              </span>
              <input type="text" id="otp" value={otp} required onChange={(e) => setOTP(e.target.value)} />
              <label htmlFor="otp">Enter OTP</label>
            </div>
            <button type="submit" className={styles.enterotp_btn}> Submit </button>
            <div className={styles.enterotp_register_link}>
              <p>
                <IonIcon icon={arrowBackOutline} style={{ marginRight: "6px", verticalAlign: "middle" }} />
                Go back to <Link to="/teachers/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default PasswordOTPTeacher;
