import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Head from 'next/head'; // For SEO meta tags
import Link from 'next/link';
import styles from './globe.module.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const GlobeVisualization = dynamic(() => import('../../components/Globe/globe'), {
  ssr: false,
  loading: () => <p>Loading globe...</p>
});

export default function GlobePage() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Projects | 3D Data Visualizations</title>
          <meta
            name="description"
            content="Discover Kai Perez's expertise in building cutting-edge web applications using React, Next.js, and Three.js. Explore innovative projects and learn how Kai can elevate your web development needs."
          />
          <meta name="keywords" content="Kai Perez, full-stack developer, React, Next.js, Three.js, web development, JavaScript, frontend development, backend development, dynamic web applications" />
          <meta name="author" content="Kai Perez" />
          <meta property="og:title" content="Kai Perez - Full-Stack Developer | React & Next.js Expertise" />
          <meta
            property="og:description"
            content="Showcasing Kai Perez's innovative web development skills using React and Next.js. Explore projects and connect with an experienced full-stack developer."
          />
          <meta property="og:image" content="/images/kai-perez-profile.jpg" />
          <meta property="og:url" content="https://yourdomain.com/globe" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Kai Perez - Full-Stack Developer | React & Next.js Expertise" />
          <meta
            name="twitter:description"
            content="Explore Kai Perez's cutting-edge web development projects using React and Next.js. Elevate your digital presence with Kai's expertise."
          />
          <meta name="twitter:image" content="/images/kai-perez-profile.jpg" />
          <link rel="canonical" href="https://yourdomain.com/globe" />
        </Head>
  
        <main className={styles.main}>
          {/* Back Button */}
          <Link href="/projects">
            <button className={styles.backButton}>
              <ChevronLeftIcon /> Kai's Projects
            </button>
          </Link>
  
          {/* Globe Visualization */}
          <Suspense fallback={<div>Loading...</div>}>
            <GlobeVisualization />
          </Suspense>
  
          
        </main>
      </>
    );
  }
