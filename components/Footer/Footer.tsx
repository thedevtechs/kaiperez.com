import React from 'react';
import styles from './Footer.module.css'; // Assuming a separate CSS file for Footer styles

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div>© 2024 Kai Perez | Cloud Architect / Full-Stack Developer</div>
    </footer>
  );
};

export default Footer;
