import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './nonImmersiveView.module.css';
import { showcaseProjects, Project } from '../../pages/projects/data'; // Import updated data structure
import Link from 'next/link';
import Footer from '../Footer/Footer'; // Adjust the path as needed

const NonImmersiveView: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [project, setProject] = useState<Project | undefined>(undefined); // Updated to use Project interface

  useEffect(() => {
    if (slug) {
      const foundProject = showcaseProjects.find((proj) => proj.slug === slug); // Adjusted for showcaseProjects
      setProject(foundProject);
    }
  }, [slug]);

  if (!project) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Loading project...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerContainer}>
        <Link href="/projects">
          <span className={styles.backButton}>
            <span className={styles.backArrow}>←</span> Back to Projects
          </span>
        </Link>
        <header className={styles.header}>
          <h1 className={styles.title}>{project.title}</h1>
          <p className={styles.subtitle}>{project.subtitle}</p>
        </header>
      </div>

      {/* Intro Section */}
      <section className={styles.introSection}>
        <div className={styles.introContent}>
          <p className={styles.description}>{project.overview}</p>
        </div>
        <div className={styles.introImage}>
          <img
            src={project.image}
            alt={`Main visual for ${project.title}`}
            className={styles.featuredImage}
          />
        </div>
      </section>

      {/* Storytelling Section */}
      <section className={styles.storySection}>
        <div className={styles.storyImage}>
          <img
            src={project.screenshots[0]}
            alt={`Screenshot for ${project.title}`}
            className={styles.featuredImage}
          />
        </div>
        <div className={styles.storyContent}>
          <h2 className={styles.sectionTitle}>Key Features</h2>
          <ul className={styles.list}>
            {project.features.map((feature, index) => (
              <li key={index} className={styles.listItem}>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technologies Section */}
      <section className={styles.techSection}>
        <h2 className={styles.sectionTitle}>Technologies Used</h2>
        <div id="particles-js" className={styles.particlesCanvas}></div>
        <div className={styles.techGrid}>
            {project.technologies.map((tech, index) => (
            <div key={index} className={styles.techItem}>
                <div className={styles.gradientIcon}></div> {/* Shimmering gradient icon */}
                <p className={styles.techName}>{tech}</p>
            </div>
            ))}
        </div>
        </section>

      {/* Results Section */}
      <section className={styles.resultsSection}>
        <div className={styles.resultsContent}>
          <h2 className={styles.sectionTitle}>The Results</h2>
          <p className={styles.description}>{project.results}</p>
        </div>
        <div className={styles.resultsImage}>
          <img
            src={project.screenshots[1] || project.image}
            alt={`Result screenshot for ${project.title}`}
            className={styles.featuredImage}
          />
        </div>
      </section>

      {/* Full-Width Final Image */}
      

      <Footer />
    </div>
  );
};

export default NonImmersiveView;
