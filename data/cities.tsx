// /data/cities.tsx
import * as THREE from 'three';

export interface CityData {
  name: string;
  country: string;
  lat: number;
  lng: number;
  population: number;
  __threeObj?: THREE.Object3D; // Add this line
}
  
  export const TRAVELED_CITIES: CityData[] = [
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
    { name: 'Krakow', country: 'Poland', lat: 50.0647, lng: 19.9450, population: 779115 },
    { name: "Krakow", country: "Poland", lat: 50.0647, lng: 19.9450, population: 779115 },
  { name: "Istanbul", country: "Turkey", lat: 41.0082, lng: 28.9784, population: 15029231 },
  { name: "Cappadocia", country: "Turkey", lat: 38.6431, lng: 34.8270, population: null },
  { name: "Patzcuaro", country: "Mexico", lat: 19.5141, lng: -101.6091, population: 87000 },
  { name: "Madrid", country: "Spain", lat: 40.4168, lng: -3.7038, population: 3223334 },
  { name: "Sofia", country: "Bulgaria", lat: 42.6977, lng: 23.3219, population: 1241675 },
  { name: "Athens", country: "Greece", lat: 37.9838, lng: 23.7275, population: 664046 },
  { name: "Naxos", country: "Greece", lat: 37.1053, lng: 25.3766, population: 6872 },
  { name: "Vienna", country: "Austria", lat: 48.2082, lng: 16.3738, population: 1921153 },
  { name: "Belfast", country: "Northern Ireland", lat: 54.5973, lng: -5.9301, population: 343542 },
  { name: "Dublin", country: "Ireland", lat: 53.3498, lng: -6.2603, population: 1173179 },
  { name: "Osaka", country: "Japan", lat: 34.6937, lng: 135.5023, population: 2752000 },
  { name: "Kobe", country: "Japan", lat: 34.6901, lng: 135.1956, population: 1513776 },
  { name: "Hiroshima", country: "Japan", lat: 34.3853, lng: 132.4553, population: 1192000 },
  { name: "Guadalajara", country: "Mexico", lat: 20.6597, lng: -103.3496, population: 1488203 },
  { name: "San Cristobal", country: "Mexico", lat: 16.7371, lng: -92.6376, population: 158027 },
  { name: "Tuxtla", country: "Mexico", lat: 16.7528, lng: -93.1167, population: 553374 }
  ];
  