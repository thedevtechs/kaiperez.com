import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './menu.module.css';

interface MenuProps {
  theme: 'light' | 'dark';
}

const Menu: React.FC<MenuProps> = ({ theme }) => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);

  const toggleMenu = () => {
    setSidebarActive(!sidebarActive);
    setToggleActive(!toggleActive);
  };

  // Determine dynamic styles based on theme
  const themeStyles = theme === 'light' ? styles.light : styles.dark;

  return (
    <>
      {/* Sidebar Menu */}
      <div className={`${styles.sidebar} ${themeStyles} ${sidebarActive ? styles.active : ''}`}>
        <ul>
          <li>
            <Link href="/" className={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/projects" className={styles.link}>
              Projects
            </Link>
          </li>
          <li>
            <a
              href="https://calendly.com/kaiperez/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Toggle Menu Button */}
      <div
        className={`${styles.toggleMenu} ${themeStyles} ${toggleActive ? styles.active : ''}`}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* Social Icons */}
      <div className={styles.socialIcons}>
        <a
          href="https://linkedin.com/in/kaiperez"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={styles.socialLink}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="Kai Perez LinkedIn Profile Icon"
            width={30}
            height={30}
          />
        </a>
        <a
          href="https://github.com/thedevtechs"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={styles.socialLink}
        >
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
