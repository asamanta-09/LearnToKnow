import styles from '../css/CourseLog.module.css'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CourseLog = ({ online_courses, offline_courses, notes }) => {
  const navigate = useNavigate();
  const handleClick = async (course) => {
    navigate('/students/courses', { state: { courseData: course } });
  };

  return (
    <div className={styles['course-log']}><br />
      {/* Online Courses Section */}
      <div className={styles['online-courses']}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Online Courses</h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          {Object.entries(online_courses).map(([topic, courses]) => (
            <div key={courses._id} onClick={() => handleClick(courses)}>
              <div className={styles["course-card-item"]}>
                {/* <img src={course.image} alt={course.name} /> */}
                <img src="/generative-ai.webp" alt={courses.topic} />
                <div className={styles['course-card-title']}>{topic}</div>
                <div className={styles["arrow"]}><FaArrowRight /></div>
              </div>
            </div>
          ))}
        </div>
      </div><br /><br />

      {/* Offline Courses Section */}
      <div className={styles["offline-courses"]}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Offline Courses</h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          {Object.entries(offline_courses).map(([topic, courses]) => (
            <div key={courses._id} onClick={() => handleClick(courses)}>
              <div className={styles["course-card-item"]}>
                {/* <img src={course.image} alt={course.name} /> */}
                <img src="/generative-ai.webp" alt={courses.topic} />
                <div className={styles['course-card-title']}>{topic}</div>
                <div className={styles["arrow"]}><FaArrowRight /></div>
              </div>
            </div>
          ))}
        </div>
      </div><br /><br />

      {/* Notes Section */}
      <div className={styles["notes-section"]}>
        <div className={styles["course-log-title"]}>
          <div className={styles["course-log-title-h4"]}>
            <h4>Notes</h4>
          </div>
          <button className={styles['view-all-button']}>View all</button>
        </div>
        <hr className={styles['hr-underline']} />
        <div className={styles["course-cards"]}>
          //need to handle
        </div>
      </div>

    </div>
  );
};

export default CourseLog;
