import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './menu.module.css';

interface MenuProps {
  theme: 'light' | 'dark';
  defaultOpen?: boolean; // New prop to default the menu to open
}

const Menu: React.FC<MenuProps> = ({ theme, defaultOpen = false }) => {
  const [sidebarActive, setSidebarActive] = useState(defaultOpen); // Initialize with defaultOpen
  const [toggleActive, setToggleActive] = useState(defaultOpen); // Sync with sidebar state

  const toggleMenu = () => {
    setSidebarActive(!sidebarActive);
    setToggleActive(!toggleActive);
  };

  // Determine dynamic styles based on theme
  const themeStyles = theme === 'light' ? styles.light : styles.dark;

  return (
    <>
      {/* Sidebar Menu */}
      <div
        className={`${styles.sidebar} ${themeStyles} ${
          sidebarActive ? styles.active : ''
        }`}
      >
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
        className={`${styles.toggleMenu} ${themeStyles} ${
          toggleActive ? styles.active : ''
        }`}
        aria-label="Toggle navigation"
        onClick={toggleMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Menu;
