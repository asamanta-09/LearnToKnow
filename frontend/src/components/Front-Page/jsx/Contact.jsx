import styles from '../css/Contact.module.css'

const Contact = () => {
  return (
    <>
      <section id="contact" className={styles.contact_section}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div className={styles.contact_img_box}>
                <img src="/contact.png" alt="Contact" />
              </div>
            </div>
            <div className={styles.column}>
              <h2 className={styles.heading}>Contact Us</h2>
              <form action="#" method="POST">
                <div className={styles.contact_form_container}>
                  <input type="text" name="fullname" placeholder="Name" required className={styles.input} />
                  <input type="email" name="ename" placeholder="Email" required className={styles.input} />
                  <input type="tel" name="tnumber" placeholder="Phone Number" required className={styles.input} />
                  <input type="text" name="message" placeholder="Message" required className={`${styles.input} ${styles.mt}`} />
                  <button type="submit" name="subnum" value="SM" className={`${styles.submit_button} ${styles.mt}`}>
                    send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
