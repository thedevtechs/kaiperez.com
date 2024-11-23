import { useEffect, useRef, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/portfolio.module.css';
import LightSwitch from '../components/LightSwitch';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { caseStudies, showcaseProjects } from './project/data';

// Replace the existing button with:
interface Project {
  title: string;
  description: string;
}

interface Skill {
  name: string;
}

const projects: Project[] = [
  {
    title: "E-commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js and Stripe",
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat app with AI integration using Socket.io",
  },
  {
    title: "Portfolio Generator",
    description: "Dynamic portfolio generator with custom themes",
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
  const [isLightsOn, setIsLightsOn] = useState(false);

  const toggleLights = () => {
    setIsLightsOn((prev) => !prev);
  };

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
        <title>Developer Portfolio - Flashlight Mode</title>
        <meta
          name="description"
          content="Full-stack developer portfolio with interactive flashlight effect"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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

      {/* Navigation */}
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
          href="#projects"
          style={{ color: isLightsOn ? '#000' : '#fff' }}
        >
          Projects
        </a>
        <a
          href="https://calendly.com/kaiperez/30min"
          target="_blank"
          style={{ color: isLightsOn ? '#000' : '#fff' }}
        >
          Contact
        </a>
      </nav>


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
    loop={true}
    centeredSlides={true} // Center the slide
  >
    {showcaseProjects.map((project, index) => (
      <SwiperSlide key={index}>
        <div className={styles.sliderContent}>
          <img src={project.img} alt={project.title} className={styles.sliderImage} />
          <div className={styles.sliderCaption}>
            <h3>{project.title}</h3>
            <p>{project.category}</p>
          </div>
        </div>
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
        <section className={styles.projectShowcase}>
          <h2 className={styles.showcaseTitle}>
            A few cool projects I've been a part of
          </h2>
          <div className={styles.projectGrid}>
            {showcaseProjects.map((project, index) => (
              <div className={styles.projectItem} key={index}>
                <img src={project.img} alt={project.title} />
                <div className={styles.projectInfo}>
                  <span className={styles.projectCategory}>
                    {project.category}
                  </span>
                  <h3>{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

{/* Toggle LightSwitch Button */}
      <LightSwitch isOn={isLightsOn} toggle={toggleLights} />
      </div>
    </>
  );
};

export default Portfolio;