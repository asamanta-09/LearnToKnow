import { Link } from 'react-router-dom'
import styles from '../css/Header.module.css'

const Header = () => {
  return (
    <>
      <header className={styles.home_header}> 
        <Link to="#" className={styles.home_logo}>
          LearnToKnow
        </Link>

        {/* Hamburger Icon */}
        <div className={styles.home_menu_icon} onClick={() => setSidebarOpen(true)}>
          {/* You can place your icon component here */}
        </div>

        <nav className={styles.home_nav}>
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#whyus">Why Us</a>
          <a href="#ourgoal">Our Goal</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>
    </>
  )
}

export default Header
