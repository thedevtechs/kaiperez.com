import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const GlobeVisualization = dynamic(() => import('../../components/globe'), {
  ssr: false,
  loading: () => <p>Loading globe...</p>
});

export default function GlobePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      
      <Suspense fallback={<div>Loading...</div>}>
        <GlobeVisualization />
      </Suspense>
    </main>
  );
}