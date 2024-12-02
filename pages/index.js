import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../components/Menu/Menu'; // Import your Menu component
import { useState, useEffect } from 'react';
import styles from './Home.module.css'; // Import the Home CSS module

const theme = 'light'; // Set your theme dynamically if needed

export default function Home() {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [toggleActive, setToggleActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setSidebarActive(!sidebarActive);
    setToggleActive(!toggleActive);
  };

  useEffect(() => {
    // Function to determine if the viewport width is for mobile
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768); // Mobile breakpoint
      }
    };

    // Run the check immediately on mount
    checkIfMobile();

    // Add event listener to handle window resize
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);


  useEffect(() => {
    // Check if the script already exists to prevent duplicates
    if (!document.querySelector("script[src='https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js']")) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.onload = () => {
        if (window.particlesJS) {
          const particleColors = theme === 'light' ? ['#FFD89B', '#FF9A8B'] : ['#3494E6', '#EC6EAD'];
          particlesJS('particles-js', {
            particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: particleColors },
              shape: { type: 'circle' },
              opacity: { value: 0.5 },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
              move: { enable: true, speed: 0.4 },
            },
            interactivity: {
              detect_on: 'canvas',
              events: {
                onhover: { 
                  enable: true, 
                  mode: 'repulse' 
                },
                onclick: { 
                  enable: true, 
                  mode: 'push' 
                },
                resize: true
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4
                },
                push: {
                  particles_nb: 4
                }
              }
            },
            retina_detect: true
          });
        }
      };
      document.body.appendChild(script);
    }

    return () => {
      const script = document.querySelector("script[src='https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js']");
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [theme]);

  return (
    <>
      <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Explore the portfolio of Kai Perez, a Cloud Architect and Full-Stack Developer. View projects, skills, and connect for collaboration." />
      <meta name="author" content="Kai Perez" />
      <meta property="og:title" content="Kai Perez - Cloud Architect & Full-Stack Developer Portfolio" />
      <meta property="og:description" content="Discover innovative projects by Kai Perez, a Cloud Architect and Full-Stack Developer. Contact Kai to build modern tech solutions." />
      <meta property="og:image" content="https://cdn-icons-png.flaticon.com/512/733/733553.png" />
      <meta property="og:image:alt" content="GitHub logo linking to Kai Perez's GitHub profile showcasing full-stack development projects" />
      <meta property="og:url" content="https://yourwebsite.com" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Kai Perez - Cloud Architect & Full-Stack Developer Portfolio" />
      <meta name="twitter:description" content="Explore Kai Perez's innovative projects in cloud architecture and full-stack development. Connect now for collaboration." />
      <meta name="twitter:image" content="https://cdn-icons-png.flaticon.com/512/733/733553.png" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet" />
      <link rel="icon" href="/favicon.png" type="image/x-icon" />
      <title>Cloud Architect & Full-Stack Developer | Kai Perez</title>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Kai Perez",
            "jobTitle": "Cloud Architect & Full-Stack Developer",
            "url": "https://yourwebsite.com",
            "sameAs": [
              "https://linkedin.com/in/kaiperez",
              "https://github.com/thedevtechs"
            ],
            "email": "kai@example.com"
          }`}
        </script>
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <div id="particles-js" style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1 }} />
      <div className="content">
        <h1>Kai Perez</h1>
        <h2>Cloud Architect / Full-Stack Developer</h2>
        <div className="button-group">
          <button onClick={() => window.open('https://calendly.com/kaiperez/30min', '_blank')}>Contact</button>
          <Link href="/projects" passHref>
            <button>Projects</button>
          </Link>
        </div>
      </div>

      <Menu theme={theme} defaultOpen={isMobile} />

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
}
