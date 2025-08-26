// Hide loading screen after a delay
setTimeout(() => {
    document.getElementById('loading').style.display = 'none';
}, 2000);

// Scene setup
const container = document.getElementById('globe');
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 400, 2000);

// Renderer setup
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});
renderer.setClearColor(0x000000, 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// pakai ukuran elemen #globe (container)
function setRendererSize() {
    const w = container.clientWidth;
    const h = container.clientHeight;
    renderer.setSize(w, h, false); // false = jangan force CSS resize
}
setRendererSize();

container.appendChild(renderer.domElement);

// (opsional) hindari gesture zoom safari
renderer.domElement.style.touchAction = 'none';


// Camera setup
const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 2000);

camera.position.set(0, 0, 300);

// Controls setup
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.enableZoom = false;    // <- penting: biar wheel tidak diblokir
controls.minDistance = 150;
controls.maxDistance = 500;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.8;


// Lighting - brighter for map visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8);
pointLight.position.set(-100, 100, 100);
scene.add(pointLight);

// Globe setup
const globe = new ThreeGlobe()
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
    .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
    .showAtmosphere(true)
    .atmosphereColor('#ffd700')
    .atmosphereAltitude(0.25);

scene.add(globe);

// Enhanced locations data - including Indonesia, India, Africa
const locations = [
    // Indonesia & Southeast Asia
    { name: 'Jakarta', lat: -6.2088, lng: 106.8456, color: '#FFD700' },
    { name: 'Singapore', lat: 1.3521, lng: 103.8198, color: '#FFA500' },
    { name: 'Bangkok', lat: 13.7563, lng: 100.5018, color: '#FFFF00' },
    { name: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869, color: '#FFB347' },

    // East Asia
    { name: 'Taipei', lat: 25.0330, lng: 121.5654, color: '#FFD700' },
    { name: 'Tokyo', lat: 35.6762, lng: 139.6503, color: '#FFA500' },
    { name: 'Seoul', lat: 37.5665, lng: 126.9780, color: '#FFFF00' },
    { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, color: '#FFB347' },
    { name: 'Shanghai', lat: 31.2304, lng: 121.4737, color: '#FFD700' },

    // South Asia & India
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, color: '#FFA500' },
    { name: 'New Delhi', lat: 28.6139, lng: 77.2090, color: '#FFFF00' },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, color: '#FFB347' },

    // Americas
    { name: 'New York', lat: 40.7128, lng: -74.0060, color: '#FFD700' },
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194, color: '#FFA500' },
    { name: 'Toronto', lat: 43.6532, lng: -79.3832, color: '#FFFF00' },
    { name: 'São Paulo', lat: -23.5505, lng: -46.6333, color: '#FFB347' },
    { name: 'Buenos Aires', lat: -34.6037, lng: -58.3816, color: '#FFD700' },

    // Europe
    { name: 'London', lat: 51.5074, lng: -0.1278, color: '#FFA500' },
    { name: 'Frankfurt', lat: 50.1109, lng: 8.6821, color: '#FFFF00' },
    { name: 'Paris', lat: 48.8566, lng: 2.3522, color: '#FFB347' },
    { name: 'Zurich', lat: 47.3769, lng: 8.5417, color: '#FFD700' },

    // Africa
    { name: 'Cape Town', lat: -33.9249, lng: 18.4241, color: '#FFA500' },
    { name: 'Lagos', lat: 6.5244, lng: 3.3792, color: '#FFFF00' },
    { name: 'Cairo', lat: 30.0444, lng: 31.2357, color: '#FFB347' },

    // Middle East & Others
    { name: 'Dubai', lat: 25.2048, lng: 55.2708, color: '#FFD700' },
    { name: 'Sydney', lat: -33.8688, lng: 151.2093, color: '#FFA500' }
];

// Enhanced connection routes from Taiwan to worldwide (with white arrows)
const routes = [
    // From Taipei to Southeast Asia (including Indonesia)
    { startLat: 25.0330, startLng: 121.5654, endLat: -6.2088, endLng: 106.8456, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 1.3521, endLng: 103.8198, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 13.7563, endLng: 100.5018, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 3.1390, endLng: 101.6869, color: '#ffffff' },

    // From Taipei to East Asia
    { startLat: 25.0330, startLng: 121.5654, endLat: 35.6762, endLng: 139.6503, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 37.5665, endLng: 126.9780, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 22.3193, endLng: 114.1694, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 31.2304, endLng: 121.4737, color: '#ffffff' },

    // From Taipei to India
    { startLat: 25.0330, startLng: 121.5654, endLat: 19.0760, endLng: 72.8777, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 28.6139, endLng: 77.2090, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 12.9716, endLng: 77.5946, color: '#ffffff' },

    // From Taipei to Americas
    { startLat: 25.0330, startLng: 121.5654, endLat: 40.7128, endLng: -74.0060, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 37.7749, endLng: -122.4194, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 43.6532, endLng: -79.3832, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: -23.5505, endLng: -46.6333, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: -34.6037, endLng: -58.3816, color: '#ffffff' },

    // From Taipei to Europe
    { startLat: 25.0330, startLng: 121.5654, endLat: 51.5074, endLng: -0.1278, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 50.1109, endLng: 8.6821, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 48.8566, endLng: 2.3522, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 47.3769, endLng: 8.5417, color: '#ffffff' },

    // From Taipei to Africa
    { startLat: 25.0330, startLng: 121.5654, endLat: -33.9249, endLng: 18.4241, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 6.5244, endLng: 3.3792, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: 30.0444, endLng: 31.2357, color: '#ffffff' },

    // From Taipei to Middle East & Others
    { startLat: 25.0330, startLng: 121.5654, endLat: 25.2048, endLng: 55.2708, color: '#ffffff' },
    { startLat: 25.0330, startLng: 121.5654, endLat: -33.8688, endLng: 151.2093, color: '#ffffff' },

    // Inter-regional connections
    { startLat: 19.0760, startLng: 72.8777, endLat: 25.2048, endLng: 55.2708, color: '#ffffff' },
    { startLat: 40.7128, startLng: -74.0060, endLat: 37.7749, endLng: -122.4194, color: '#ffffff' },
    { startLat: 51.5074, startLng: -0.1278, endLat: 50.1109, endLng: 8.6821, color: '#ffffff' },
    { startLat: -33.9249, startLng: 18.4241, endLat: 6.5244, endLng: 3.3792, color: '#ffffff' }
];

// Add points to globe
globe
    .pointsData(locations)
    .pointAltitude(0.01)
    .pointColor('color')
    .pointRadius(0.8)
    .pointResolution(20);

// Add arcs (animated arrows) to globe
globe
    .arcsData(routes)
    .arcColor('color')
    .arcAltitudeAutoScale(0.3)
    .arcStroke(0.6)
    .arcDashLength(0.4)
    .arcDashGap(0.2)
    .arcDashInitialGap(() => Math.random())
    .arcDashAnimateTime(3000);

// Add labels
globe
    .labelsData(locations)
    .labelText('name')
    .labelSize(1.2)
    .labelColor(() => 'rgba(255, 215, 0, 0.9)')
    .labelDotRadius(0.4)
    .labelAltitude(0.01);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Handle window resize
function handleResize() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}
window.addEventListener('resize', handleResize);


// Add golden glow effect only
const glowGeometry = new THREE.SphereGeometry(100, 32, 32);
const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.1,
    side: THREE.BackSide
});
const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
// scene.add(glowMesh);
