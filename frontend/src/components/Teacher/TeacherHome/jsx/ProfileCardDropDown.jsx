import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../css/ProfileCardDropDown.module.css';
import { IoIosArrowForward } from "react-icons/io";

const ProfileCardDropDown = () => {
  const navigate = useNavigate();
  const options = [
    { label: "View Profile", action: () => navigate('/profile') },
    { label: "Edit Profile", action: () => navigate('/edit-profile') },
    { label: "Settings and Privacy", action: () => navigate('/settings') },
    { label: "Logout", action: async () => {
        try {
          await axios.post("/teacher/logout", {}, { withCredentials: true });
        } catch (err) {
          console.error("Logout failed:", err);
        }
        localStorage.removeItem('token');
        localStorage.removeItem('email'); 
        navigate("/teachers/login");
      }
    }
  ];

  return (
    <div className={styles['profilecard-container-menu']}>
      <div className={styles["profile-image-dropdown"]}>
        <img className={styles['image-dropdown']} src="/nisha.webp" alt="profile" />
      </div>
      <hr className={styles["hr-underline-profile"]} />
      <div className={styles["profile-options-dropdown"]}>
        {options.map((item) => (
          <div key={item.label}>
            <div
              className={styles['profile-menu-item']}
              onClick={item.action}
              style={{ cursor: "pointer" }}
            >
              <span className={styles['profile-item-name']}>
                {item.label}
                <IoIosArrowForward />
              </span>
            </div>
            <hr className={styles["hr-underline-profile"]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCardDropDown;
