import Header from './Header';
import Footer from '../../Utility-all/Footer';
import styles from '../css/WhyUs.module.css'

const WhyUsPage = () => {
  return (
    <>
      <Header />
      <div className={styles.whyus}>
        <Why />
      </div>
      <Footer />
    </>
  )
} 

const WhyUs = () => {
  return (
    <>
      <section id="whyus" className={styles.whyusCard}>
        <div className={styles.whyusImage}>
          <img src="/whyus.png" alt="why us" />
        </div>
        <div className={styles.whyusContent}>
          <h2 className={styles.whyusTitle}>Why Us</h2>
          <div className={styles.whyusParagraph}>
            Our platform is designed to connect students with qualified teachers across a range of subjects and disciplines. Whether you're looking for a tutor to help you with math, science, language, music, or any other subject, we have a database of verified and qualified teachers who can meet your needs.<br /> <br />

            At our teacher searching portal, we are committed to providing a safe, secure, and user-friendly platform for both students and teachers. We take privacy and security seriously, and our team works tirelessly to ensure that our platform is up-to-date with the latest security protocols.
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUsPage;
export { WhyUs };
