import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const GlobeVisualization = dynamic(() => import('../../components/globe'), {
  ssr: false,
  loading: () => <p>Loading globe...</p>
});

export default function GlobePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-4 text-center">
          My Travel Globe (Work in progress)
        </h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <GlobeVisualization />
      </Suspense>
    </main>
  );
}