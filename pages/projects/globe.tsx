import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import Link from 'next/link';
import styles from './globe.module.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const GlobeVisualization = dynamic(() => import('../../components/globe'), {
  ssr: false,
  loading: () => <p>Loading globe...</p>
});

export default function GlobePage() {
  return (
    <main className={styles.main}>
      {/* Back Button */}
      <Link href="/projects">
        <button className={styles.backButton}>
          <ChevronLeftIcon /> Back
        </button>
      </Link>

      {/* Globe Visualization */}
      <Suspense fallback={<div>Loading...</div>}>
        <GlobeVisualization />
      </Suspense>
    </main>
  );
}
