import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IonIcon } from "@ionic/react";
import { logoFirebase, keyOutline, arrowBackOutline, menuOutline, closeOutline } from "ionicons/icons";
import styles from "../css/enterotp.module.css";

function EmailVerificationOTPTeacher() {
  const [otp, setOTP] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { teacherData } = location.state || {};
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email: teacherData.email, otp };
    axios.post('/teacher/verifyOTP', data, { withCredentials: true })
      .then((response) => {
        if (response.data.success === true) {
          return axios.post('/teacher/signUp', teacherData, { withCredentials: true })
        } else {
          toast.warn(response.data.message);
          throw new Error("Invalid OTP");
        }
      })
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate('/teachers/login');
        } else {
          toast(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error during verification/sign up:', error);
      });

  };


  return (
    <div>
      <header className={styles.enterotp_header}>
        <Link to="#" className={styles.enterotp_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.login_menu_icon} onClick={() => setSidebarOpen(true)}>
          <IonIcon icon={menuOutline} />
        </div>


        <nav className={styles.enterotp_nav}>
          <Link to="/home">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/our-goal">Our Goal</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/teachers/login">Login</Link>
        </nav>
      </header>

      {/* Sidebar for small screens */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        <div className={styles.close_btn} onClick={() => setSidebarOpen(false)}>
          <IonIcon icon={closeOutline} />
        </div>
        <Link to="/home" onClick={() => setSidebarOpen(false)}>Home</Link>
        <Link to="/about-us" onClick={() => setSidebarOpen(false)}>About Us</Link>
        <Link to="/our-goal" onClick={() => setSidebarOpen(false)}>Our goal</Link>
        <Link to="/contact-us" onClick={() => setSidebarOpen(false)}>Contact Us</Link>
        <Link to="/teachers/login" onClick={() => setSidebarOpen(false)}>Login</Link>
      </div>

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
          <h2>Email Verification</h2>
          <form onSubmit={handleSubmit} className={styles.enterotp_form} >
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

export default EmailVerificationOTPTeacher;
