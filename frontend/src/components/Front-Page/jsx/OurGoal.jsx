import Header from './Header';
import Footer from '../../Utility-all/Footer';
import styles from '../css/OurGoal.module.css';


const OurGoalPage = () => {
  return (
    <>
      <Header />
      <div className={styles.ourgoal}> 
        <OurGoal />
      </div>
      <Footer />
    </>
  );
};

const OurGoal = () => {
  return (
    <section id="ourgoal" className={styles.ourgoalCard}>
      <div className={styles.ourgoalContent}>
        <h2 className={styles.ourgoalTitle}>Our Goal</h2>
        <div className={styles.ourgoalParagraph}>
          We are a dedicated team of education enthusiasts who understand the importance of finding the right teacher for every student. Our mission is to make it easy for students and parents to find experienced, knowledgeable, and passionate teachers who can help them achieve their academic goals.<br /><br />

          We believe that learning should be engaging, interactive, and enjoyable, and that the best way to achieve this is through personalized one-on-one instruction. Our platform allows students to connect with teachers who can tailor their lessons to their unique learning styles, needs, and preferences.
        </div>
      </div>
      <div className={styles.ourgoalImage}>
        <img src="/ourgoal.png" alt="about us" />
      </div>
    </section>
  );
}

export default OurGoalPage;
export { OurGoal };
