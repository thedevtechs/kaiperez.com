// components/Menu.tsx

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/menu.module.css'; // Corrected filename if it was a typo

const Menu: React.FC = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);

  const toggleMenu = () => {
    setSidebarActive(!sidebarActive);
    setToggleActive(!toggleActive);
  };

  return (
    <>
      {/* Sidebar Menu */}
      <div className={`${styles.sidebar} ${sidebarActive ? styles.active : ''}`}>
        <ul>
            
          <li>
            <Link href="/" rel="noopener noreferrer" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={styles.link}>
              Projects
            </Link>
          </li>
          <li>
            <a href="https://calendly.com/kaiperez/30min" target="_blank" rel="noopener noreferrer" className={styles.link}>
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Toggle Menu Button */}
      <div
        className={`${styles.toggleMenu} ${toggleActive ? styles.active : ''}`}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Social Icons */}
      <div className={styles.socialIcons}>
        <a href="https://linkedin.com/in/kaiperez" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialLink}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="Kai Perez LinkedIn Profile Icon"
            width={30}
            height={30}
          />
        </a>
        <a href="https://github.com/thedevtechs" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={styles.socialLink}>
          <Image
            src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
            alt="GitHub Icon for Kai Perez"
            width={30}
            height={30}
          />
        </a>
      </div>
    </>
  );
};

export default Menu;
