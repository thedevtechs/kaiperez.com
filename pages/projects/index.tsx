import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import styles from './projectsArchive.module.css';
import LightSwitch from '../../components/LightSwitch/LightSwitch';
import Menu from '../../components/Menu/Menu'; // Import Menu component
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { showcaseProjects } from '../../data/data';
import ProjectShowcase from '../../components/ProjectShowcase/ProjectShowcase';
import Footer from '../../components/Footer/Footer';

interface Project {
  title: string;
  description: string;
}

interface Skill {
  name: string;
}

const projects: Project[] = [
  {
    title: "Point of Sale iOS / Android App",
    description: "A full-stack e-commerce solution built with Next.js and Stripe",
  },
  {
    title: "Resume / Cover Letter Generator",
    description: "Dynamic portfolio generator with custom themes",
  },
  {
    title: "AI Chat Bots",
    description: "Real-time chat app with AI integration using Socket.io",
  },
];

const skills: Skill[] = [
  { name: "React" },
  { name: "Node.js" },
  { name: "TypeScript" },
  { name: "Next.js" },
  { name: "MongoDB" },
];

const Portfolio = () => {
  const lightRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isLightsOn, setIsLightsOn] = useState(true);
  const [isMobile, setIsMobile] = useState(false); // State to track mobile devices

  const toggleLights = () => {
    setIsLightsOn((prev) => !prev);
  };

  useEffect(() => {
    // Function to check if the device is mobile
    const checkIsMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 768);
      }
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener('resize', checkIsMobile);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current && cursorRef.current) {
        // Update flashlight position
        lightRef.current.style.left = `${e.clientX}px`;
        lightRef.current.style.top = `${e.clientY}px`;

        // Update custom cursor position
        cursorRef.current.style.left = `${e.clientX - 10}px`;
        cursorRef.current.style.top = `${e.clientY - 10}px`;
      }
    };

    // Add light flicker effect
    const flickerInterval = setInterval(() => {
      if (lightRef.current) {
        const randomScale = 0.95 + Math.random() * 0.1;
        lightRef.current.style.transform = `translate(-50%, -50%) scale(${randomScale})`;
      }
    }, 50);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Portfolio | Kai Perez</title>
        <meta
          name="description"
          content="Full-stack developer portfolio with interactive flashlight effect"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {/* Custom Cursor */}
      <div
        className={`${styles.customCursor} ${
          isLightsOn ? styles.hideCursor : ''
        }`}
        ref={cursorRef}
      />

      {/* Flashlight Effect */}
      <div
        className={`${styles.light} ${isLightsOn ? styles.hideLight : ''}`}
        ref={lightRef}
      />

        {isMobile ? (
          <></>
        ) : (
          <nav
        className={`${styles.nav} ${isLightsOn ? styles.lightBackground : ''}`}
      >
        <a
          href="/"
          style={{ color: isLightsOn ? '#000' : '#fff' }}
        >
          Home
        </a>
        <a
          href="/projects"
          style={{ color: isLightsOn ? '#000' : '#fff' }}
        >
          Projects
        </a>
        <a
          href="https://calendly.com/kaiperez/30min"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: isLightsOn ? '#000' : '#fff' }}
        >
          Contact
        </a>
      </nav>
        )}
      {/* Main Content */}
      <div
        className={`${styles.content} ${
          isLightsOn ? styles.lightBackground : ''
        }`}
      >
        {/* Hero Section */}
          <section className={styles.heroSection}>
            <div className={styles.hero}>
              <h1>Kai Perez</h1>
              <div className={styles.title}>Cloud Architect / Full-Stack Developer</div>
              <p>Building digital experiences with code and creativity</p>

              <div className={styles.skills}>
                {skills.map((skill, index) => (
                  <span key={index} className={styles.skillTag}>
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Slider */}
            <div className={styles.slider}>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                centeredSlides={true}
              >
                {showcaseProjects
                  .filter((project) => project.isFeatured)
                  .map((project, index) => (
                    <SwiperSlide key={index}>
                      <Link href={`/projects/${project.slug}`} passHref>
                        <span className={styles.sliderLink}>
                          <div className={styles.sliderContent}>
                            <img
                              src={project.image}
                              alt={project.title}
                              className={styles.sliderImage}
                            />
                            <div className={styles.sliderCaption}>
                              <h3>{project.title}</h3>
                              <p style={{ color: '#00b894' }}>{project.category}</p>
                            </div>
                          </div>
                        </span>
                      </Link>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </section>

        {/* Projects Section */}
        <section className={styles.projects} id="projects">
          <h2>What I'm working on</h2>
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Project Showcase */}
        <ProjectShowcase
          projects={showcaseProjects
            .filter((project) => !project.isFeatured)
            .map((project) => ({
              ...project,
              // You can add or modify properties here if needed
            }))}
        />
        { isLightsOn && 
          <Footer/>
        }

        {/* Toggle LightSwitch or Menu */}
        {isMobile ? (
          <Menu />
        ) : (
          <LightSwitch isOn={isLightsOn} toggle={toggleLights} />
        )}
      </div>
    </>
  );
};

export default Portfolio;
