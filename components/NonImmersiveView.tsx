import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/nonImmersiveView.module.css';
import { caseStudies, CaseStudy } from '../pages/project/data';

const NonImmersiveView: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [caseStudy, setCaseStudy] = useState<CaseStudy | undefined>(
    undefined
  );
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      const foundCaseStudy = caseStudies.find((cs) => cs.slug === slug);
      setCaseStudy(foundCaseStudy);
      if (foundCaseStudy) {
        setActiveImage(foundCaseStudy.screenshots[0]); // Set first image as the active image
      }
    }
  }, [slug]);

  if (!caseStudy) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>Loading case study...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{caseStudy.title}</h1>
        <p className={styles.subtitle}>{caseStudy.subtitle}</p>
      </header>

      <div className={styles.contentLayout}>
        {/* Left Column (Gallery) */}
        <div className={styles.leftColumn}>
          <div className={styles.gallery}>
            {/* Main Image */}
            <div className={styles.mainImageContainer}>
              <img
                src={activeImage || caseStudy.screenshots[0]}
                alt="Active screenshot"
                className={styles.mainImage}
              />
            </div>

            {/* Thumbnail Images */}
            <div className={styles.thumbnailContainer}>
              {caseStudy.screenshots.map((screenshot, index) => (
                <img
                  key={index}
                  src={screenshot}
                  alt={`Screenshot ${index + 1}`}
                  className={`${styles.thumbnail} ${
                    activeImage === screenshot ? styles.activeThumbnail : ''
                  }`}
                  onClick={() => setActiveImage(screenshot)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Details) */}
        <div className={styles.rightColumn}>
          <section className={styles.overviewSection}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            <p className={styles.description}>{caseStudy.overview}</p>
          </section>

          <section className={styles.detailsSection}>
            <div>
              <h2 className={styles.sectionTitle}>Technologies Used</h2>
              <ul className={styles.list}>
                {caseStudy.technologies.map((tech, index) => (
                  <li key={index} className={styles.listItem}>
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Features</h2>
              <ul className={styles.list}>
                {caseStudy.features.map((feature, index) => (
                  <li key={index} className={styles.listItem}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className={styles.resultsSection}>
            <h2 className={styles.sectionTitle}>Results</h2>
            <p className={styles.description}>{caseStudy.results}</p>
          </section>
        </div>
      </div>

      <footer className={styles.footer}>
        <div>
          <strong>Slug:</strong> {caseStudy.slug}
        </div>
      </footer>
    </div>
  );
};

export default NonImmersiveView;
