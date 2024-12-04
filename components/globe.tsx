'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TRAVELED_CITIES, CityData } from '../data/cities'; // Adjust the path as needed

export default function GlobeVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000 // Increased far plane to accommodate background sphere
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 150);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;

    // Set zoom limits
    controls.minDistance = 100; // Adjust as needed based on your globe size
    controls.maxDistance = 300; // Prevent zooming out too far

    // Background setup (Large sphere that moves with the globe)
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      '//unpkg.com/three-globe/example/img/night-sky.png',
      (texture) => {
        const backgroundGeometry = new THREE.SphereGeometry(1000, 64, 64);
        const backgroundMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.BackSide, // Render the inside of the sphere
        });
        const backgroundMesh = new THREE.Mesh(
          backgroundGeometry,
          backgroundMaterial
        );
        scene.add(backgroundMesh);
      }
    );

    // Prepare points data
    const pointsData = TRAVELED_CITIES;

    // Globe setup
    const globe = new ThreeGlobe()
      .globeImageUrl(
        'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
      )
      .bumpImageUrl(
        'https://unpkg.com/three-globe/example/img/earth-topology.png'
      )
      .pointsData(pointsData)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(0.01)
      .pointRadius(0.5)
      .pointColor(() => '#ff5733');

    scene.add(globe);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight1.position.set(1, 1, 1).normalize();
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight2.position.set(-1, -1, -1).normalize();
    scene.add(directionalLight2);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event: MouseEvent) => {
      if (!mountRef.current) return;

      const rect = mountRef.current.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        globe.pointsData().map((point) => point.__threeObj),
        true
      );

      const cityIntersect = intersects.find(
        (intersect): boolean =>
          intersect.object.userData && 'name' in intersect.object.userData
      );

      if (cityIntersect) {
        const city = cityIntersect.object.userData as CityData;
        setSelectedCity(city);
      } else {
        setSelectedCity(null);
      }
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    // Auto-rotate variables
    let globeRotate = true;

    // Animation loop
    const animate = () => {
      if (globeRotate) {
        globe.rotation.y += 0.001; // Adjust rotation speed as needed
      }

      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Event listeners
    window.addEventListener('click', onMouseClick);
    window.addEventListener('resize', onResize);

    // Pause rotation on user interaction
    controls.addEventListener('start', () => {
      globeRotate = false;
    });

    // Resume rotation after interaction
    controls.addEventListener('end', () => {
      globeRotate = true;
    });

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onResize);
      controls.removeEventListener('start', () => {
        globeRotate = false;
      });
      controls.removeEventListener('end', () => {
        globeRotate = true;
      });
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      {/* Title */}
      <h1
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          zIndex: 1000,
        }}
      >
        Cities I've Visited
      </h1>
      {/* City Info Popup */}
      {selectedCity && (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-10">
          <h2 className="text-xl font-bold mb-2">
            {selectedCity.name}, {selectedCity.country}
          </h2>
          <p>Population: {selectedCity.population.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
