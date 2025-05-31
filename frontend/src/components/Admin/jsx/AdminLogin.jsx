import axios from 'axios';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AdminLogin.module.css';

const AdminLogin = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post('/admin/login', { username, password });

      const authHeader = response.headers['authorization']; 
      if (authHeader) {
        const token = authHeader.split(" ")[1];
        localStorage.setItem('token', token);
        localStorage.setItem('username', username); 
        navigate('/admins/home');
        toast.success("Welcome back Admin");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error("Invalid username or password. Please try again.");
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form} onSubmit={handleForm} >
          <div className={styles.inputGroup}>
            <input type="text" name="username" placeholder="Username" ref={usernameRef} required className={styles.input} />
          </div>
          <div className={styles.inputGroup}>
            <input type="password" name="password" placeholder="Password" ref={passwordRef} required className={styles.input} />
          </div>
          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.button} > Login </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
