'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Types for city data
interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
}

// Cities you've traveled to
const TRAVELED_CITIES: CityData[] = [
  { name: 'Phuket', country: 'Thailand', lat: 7.8804, lng: 98.3923, population: 89069 },
  { name: 'Santorini', country: 'Greece', lat: 36.3932, lng: 25.4615, population: 15550 },
  { name: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437, population: 3970000 },
  { name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, population: 8419000 },
  { name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, population: 37400000 },
  { name: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, population: 8982000 },
  { name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, population: 2148000 },
  { name: 'Budapest', country: 'Hungary', lat: 47.4979, lng: 19.0402, population: 1750000 },
  { name: 'Brattleboro', country: 'United States', lat: 42.8508, lng: -72.5579, population: 12046 },
  { name: 'Marrakesh', country: 'Morocco', lat: 31.6295, lng: -7.9811, population: 928850 },
  { name: 'Barcelona', country: 'Spain', lat: 41.3874, lng: 2.1686, population: 1636000 },
  { name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, population: 9209944 },
  { name: 'Cancun', country: 'Mexico', lat: 21.1619, lng: -86.8515, population: 888797 },
  { name: 'Antigua', country: 'Guatemala', lat: 14.5566, lng: -90.7332, population: 45629 },
  { name: 'Caye Caulker', country: 'Belize', lat: 17.7425, lng: -88.0250, population: 1300 },
  { name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, population: 21540000 },
  { name: 'Lisbon', country: 'Portugal', lat: 38.7223, lng: -9.1393, population: 544851 },
  { name: 'Brussels', country: 'Belgium', lat: 50.8503, lng: 4.3517, population: 1211035 },
  { name: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lng: 4.9041, population: 872757 },
  { name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, population: 3769000 },
  { name: 'Frankfurt', country: 'Germany', lat: 50.1109, lng: 8.6821, population: 764104 },
  { name: 'Prague', country: 'Czech Republic', lat: 50.0755, lng: 14.4378, population: 1309000 },
  { name: 'Bruno', country: 'Czech Republic', lat: 49.1951, lng: 16.6068, population: 380000 },
  { name: 'Sapporo', country: 'Japan', lat: 43.0618, lng: 141.3545, population: 1952000 },
  { name: 'Okinawa', country: 'Japan', lat: 26.3344, lng: 127.8056, population: 1437000 },
  { name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, population: 1475000 },
  { name: 'Bratislava', country: 'Slovakia', lat: 48.1486, lng: 17.1077, population: 432864 },
  { name: 'Hakodate', country: 'Japan', lat: 41.7687, lng: 140.7288, population: 264000 },
  { name: 'Krakow', country: 'Poland', lat: 50.0647, lng: 19.9450, population: 779115 }
];

export default function GlobeVisualization() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const globeRef = useRef<ThreeGlobe | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, 0, 350);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.5;

    // Prepare points data
    const pointsData = TRAVELED_CITIES;

    // Globe setup
    const globe = new ThreeGlobe()
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .pointsData(pointsData)
      .pointLat('lat')
      .pointLng('lng')
      .pointAltitude(0.01)
      .pointRadius(0.5)
      .pointColor(() => '#ff5733');

    globeRef.current = globe;
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
      const intersects = raycaster.intersectObjects(scene.children, true);

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

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    window.addEventListener('click', onMouseClick);
    window.addEventListener('resize', onResize);

    animate();

    return () => {
      window.removeEventListener('click', onMouseClick);
      window.removeEventListener('resize', onResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />
      {selectedCity && (
        <div
          className="fixed top-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-10"
        >
          <h2 className="text-xl font-bold mb-2">
            {selectedCity.name}, {selectedCity.country}
          </h2>
          <p>Population: {selectedCity.population.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
