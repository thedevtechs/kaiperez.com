import React from 'react';
import styles from './ProjectShowcase.module.css';
import Link from 'next/link';

interface ShowcaseProject {
  image: string;
  title: string;
  category: string;
  slug: string; // Add slug for links
}

interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
  return (
    <section className={styles.projectShowcase}>
      <h4 className={styles.showcaseTitle}>Projects I've been a part of</h4>
      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <Link href={`/projects/${project.slug}`} key={index} passHref>
            <span className={styles.projectItem}>
              <img src={project.image} alt={project.title} className={styles.projectImage} />
              <div className={styles.projectInfo}>
                <span className={styles.projectCategory}>{project.category}</span>
                <h3>{project.title}</h3>
              </div>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectShowcase;
