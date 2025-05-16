import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { mailOutline, logoFirebase, arrowBackOutline} from 'ionicons/icons';
import styles from "../css/ForgetPassword.module.css";
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'

function ForgetPasswordTeacher() {
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  const name = "Teacher";
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await axios.post('/teacher/generateOTP', { email,name }, { withCredentials: true });
      navigate('/teachers/password-otp', { state: { email } });
    } catch (error) {
      console.error('Error sending login data:', error);
    }
  };

  return (
    <div>
      <header className={styles.forgetpassword_header}>
        <Link to="#" className={styles.forgetpassword_logo}>
          <IonIcon icon={logoFirebase} />
          LearnToKnow
        </Link>
        <nav className={styles.forgetpassword_nav}>
          <Link to="#">Home</Link>
          <Link to="#">About Us</Link>
          <Link to="#">Contact Us</Link>
          <Link to="/teachers/signup">Sign Up</Link>
        </nav>
      </header>

      <section className={styles.forgetpassword_home}>
        <div className={styles.forgetpassword_content}>
          <h3>Learning is a journey, not a destination</h3>
          <p>
            “Knowledge is the seed, learning is the rain.
            With patience and curiosity, wisdom blooms.
            A mind open to learning is a garden that never withers.”
          </p>
          <Link to="#">Get Started</Link>
        </div>

        <div className={styles.forgetpassword_wrapper_login}>
          <h2>Teacher Login</h2>
          <h4>Forget password? Not a problem!</h4>
          <form onSubmit={handleSubmit}>
            <div className={styles.forgetpassword_input_box}>
              <span className={styles.forgetpassword_icon}>
                <IonIcon icon={mailOutline} />
              </span>
              <input type="email" id="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
              <label htmlFor="email">Enter your email</label>
            </div>

            <button type="submit" className={styles.forgetpassword_btn}>
              Send OTP
            </button>

            <div className={styles.forgetpassword_register_link}>
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

export default ForgetPasswordTeacher;
