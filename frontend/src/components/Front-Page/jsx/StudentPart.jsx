import { Link } from "react-router-dom"
import styles from '../css/StudentPart.module.css'

const StudentPart = () => {
  return (
    <>
      <section className={styles.studentSection}>
        <div>
          <div className={styles.studentSectionText}>
            <h2 className={styles.studentSection_Title}>For Students</h2>
            <p className={styles.studentSection_Paragraph}> “A good teacher is like a candle,it consumes itself to light the way for others.” - Mustafa Kemal Ataturk</p>
            <Link to="/student/login">
              <button className={styles.studentSection_button}>Explore Now</button>
            </Link>
          </div>
          <div className={styles.studentSection_Img}>
            <img src="/student.webp" alt="" />
          </div>
        </div>
      </section>
    </>
  )
}

export default StudentPart;
