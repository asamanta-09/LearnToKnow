import Header from './Header'
import WelcomeMessage from './WelcomeMessage'
import StudentPart from './StudentPart'
import TeacherPart from './TeacherPart'
import { AboutUs } from './AboutUs'
import { WhyUs } from './WhyUs'
import { OurGoal } from './OurGoal'
import Testmonial from './Testmonial'
import Contact from './Contact'
import Footer from '../../Utility-all/Footer'
import styles from '../css/HomePage.module.css'


const HomePage = () => {
  return (
    <div id="home" className={styles['body']}>
      <Header />
      <WelcomeMessage />
      <StudentPart />
      <TeacherPart />
      <AboutUs />
      <WhyUs />
      <OurGoal />
      <Testmonial />
      <Contact /><hr />
      <Footer />
    </div>
  )
}

export default HomePage;
