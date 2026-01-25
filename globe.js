// =====================================================
// LUXQUANT - GLOBE VISUALIZATION
// Version: 2.0 - With Loading Animation
// =====================================================

console.log('🌍 LuxQuant Globe.js Loading...');

// Wait for DOM and Three.js to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure Three.js is loaded
    setTimeout(initGlobe, 500);
});

function initGlobe() {
    const globeContainer = document.getElementById('globe');
    const globeLoader = document.getElementById('globeLoader');
    
    if (!globeContainer) {
        console.log('⚠️ Globe container not found');
        return;
    }
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined' || typeof ThreeGlobe === 'undefined') {
        console.error('❌ Three.js or ThreeGlobe not loaded');
        if (globeLoader) globeLoader.classList.add('hidden');
        return;
    }
    
    console.log('🌍 Initializing Globe...');
    
    try {
        // Scene setup
        const scene = new THREE.Scene();
        
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setClearColor(0x000000, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(globeContainer.clientWidth, globeContainer.clientHeight);
        globeContainer.appendChild(renderer.domElement);
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            50, 
            globeContainer.clientWidth / globeContainer.clientHeight, 
            0.1, 
            2000
        );
        camera.position.set(0, 0, 280);
        
        // Controls setup
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Globe setup
        const globe = new ThreeGlobe()
            .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-night.jpg')
            .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
            .showAtmosphere(true)
            .atmosphereColor('#d4a853')
            .atmosphereAltitude(0.2);
        
        scene.add(globe);
        
        // Locations data
        const locations = [
            { lat: -6.2088, lng: 106.8456, name: 'Jakarta' },
            { lat: 1.3521, lng: 103.8198, name: 'Singapore' },
            { lat: 25.0330, lng: 121.5654, name: 'Taipei' },
            { lat: 35.6762, lng: 139.6503, name: 'Tokyo' },
            { lat: 40.7128, lng: -74.0060, name: 'New York' },
            { lat: 51.5074, lng: -0.1278, name: 'London' },
            { lat: 25.2048, lng: 55.2708, name: 'Dubai' },
            { lat: -33.8688, lng: 151.2093, name: 'Sydney' },
            { lat: 19.0760, lng: 72.8777, name: 'Mumbai' },
            { lat: -23.5505, lng: -46.6333, name: 'São Paulo' },
            { lat: 37.5665, lng: 126.9780, name: 'Seoul' },
            { lat: 52.5200, lng: 13.4050, name: 'Berlin' }
        ];
        
        // Points data (golden dots)
        const pointsData = locations.map(loc => ({
            lat: loc.lat,
            lng: loc.lng,
            color: '#d4a853'
        }));
        
        // Arcs data (connections from Taipei)
        const taipeiLat = 25.0330;
        const taipeiLng = 121.5654;
        const arcsData = locations
            .filter(loc => loc.name !== 'Taipei')
            .map(loc => ({
                startLat: taipeiLat,
                startLng: taipeiLng,
                endLat: loc.lat,
                endLng: loc.lng,
                color: '#ffffff'
            }));
        
        // Add points to globe
        globe
            .pointsData(pointsData)
            .pointColor('color')
            .pointRadius(0.6)
            .pointAltitude(0.01);
        
        // Add arcs to globe
        globe
            .arcsData(arcsData)
            .arcColor('color')
            .arcStroke(0.4)
            .arcDashLength(0.4)
            .arcDashGap(0.2)
            .arcDashAnimateTime(3000);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
        
        // Handle resize
        function handleResize() {
            const width = globeContainer.clientWidth;
            const height = globeContainer.clientHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        window.addEventListener('resize', handleResize);
        
        // Hide loader after globe is ready
        setTimeout(() => {
            if (globeLoader) {
                globeLoader.classList.add('hidden');
            }
            console.log('✅ Globe initialized successfully!');
        }, 1500);
        
    } catch (error) {
        console.error('❌ Globe initialization error:', error);
        if (globeLoader) {
            globeLoader.innerHTML = '<span style="color: #d4a853;">Globe unavailable</span>';
        }
    }
}

console.log('✅ LuxQuant Globe.js Loaded!');
