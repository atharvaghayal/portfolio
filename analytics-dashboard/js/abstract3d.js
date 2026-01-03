// Abstract3D - Vanilla Three.js implementation
// Replicating the React Three Fiber component for the analytics dashboard

class Abstract3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.animationId = null;
        this.clock = new THREE.Clock();

        this.init();
        this.createScene();
        this.animate();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a); // Dark background
        this.scene.fog = new THREE.Fog(0x000000, 10, 50); // Add fog for depth

        // Camera
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 0, 8);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0a0a0a, 1); // Dark background
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    createScene() {
        try {
            this.addLighting();
            this.addTechStructure();
            this.addControls();
            console.log('3D scene created successfully');
        } catch (error) {
            console.error('Failed to create 3D scene:', error);
            // Fallback: add a simple rotating cube
            this.addFallbackScene();
        }
    }

    addLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point lights
        const pointLight1 = new THREE.PointLight(0x60a5fa, 0.6);
        pointLight1.position.set(-10, -10, -5);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xf472b6, 0.6);
        pointLight2.position.set(10, -10, -5);
        this.scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0x8b5cf6, 0.5);
        pointLight3.position.set(0, 10, 0);
        this.scene.add(pointLight3);

        // Spot light
        const spotLight = new THREE.SpotLight(0xffffff, 0.4);
        spotLight.position.set(0, 10, 0);
        spotLight.angle = 0.3;
        spotLight.penumbra = 1;
        spotLight.castShadow = true;
        this.scene.add(spotLight);
    }

    addTechStructure() {
        // Group for floating effect
        this.techGroup = new THREE.Group();
        this.scene.add(this.techGroup);

        this.addGlowCore();
        this.addTechCore();
        this.addCircuitRings();
        this.addDataNodes();
        this.addDataParticles();
    }

    addGlowCore() {
        // Inner glowing icosahedron
        const geometry = new THREE.IcosahedronGeometry(1, 1);
        const material = new THREE.MeshStandardMaterial({
            color: 0xfbbf24,
            emissive: 0xf59e0b,
            emissiveIntensity: 2,
            metalness: 0.9,
            roughness: 0.1
        });

        this.glowCore = new THREE.Mesh(geometry, material);
        this.glowCore.scale.setScalar(0.6);
        this.techGroup.add(this.glowCore);
    }

    addTechCore() {
        // Central octahedron with transmission-like material
        const geometry = new THREE.OctahedronGeometry(1.2, 0);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x3B82F6,
            emissive: 0x3B82F6,
            emissiveIntensity: 0.3,
            metalness: 0.8,
            roughness: 0.15,
            transmission: 0.9,
            thickness: 1.2,
            ior: 1.5,
            transparent: true,
            opacity: 0.8
        });

        this.techCore = new THREE.Mesh(geometry, material);
        this.techGroup.add(this.techCore);
    }

    addCircuitRings() {
        // Three rotating torus rings
        const ringGeometry1 = new THREE.TorusGeometry(1.8, 0.08, 16, 100);
        const ringMaterial1 = new THREE.MeshStandardMaterial({
            color: 0x8b5cf6,
            emissive: 0xa78bfa,
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2
        });
        this.ring1 = new THREE.Mesh(ringGeometry1, ringMaterial1);
        this.ring1.rotation.x = Math.PI / 2;
        this.techGroup.add(this.ring1);

        const ringGeometry2 = new THREE.TorusGeometry(2.2, 0.06, 16, 100);
        const ringMaterial2 = new THREE.MeshStandardMaterial({
            color: 0xec4899,
            emissive: 0xf472b6,
            emissiveIntensity: 0.4,
            metalness: 0.8,
            roughness: 0.2
        });
        this.ring2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
        this.ring2.rotation.x = Math.PI / 2;
        this.ring2.rotation.z = Math.PI / 4;
        this.techGroup.add(this.ring2);

        const ringGeometry3 = new THREE.TorusGeometry(2.0, 0.05, 16, 100);
        const ringMaterial3 = new THREE.MeshStandardMaterial({
            color: 0x10b981,
            emissive: 0x34d399,
            emissiveIntensity: 0.4,
            metalness: 0.8,
            roughness: 0.2
        });
        this.ring3 = new THREE.Mesh(ringGeometry3, ringMaterial3);
        this.ring3.rotation.y = Math.PI / 4;
        this.techGroup.add(this.ring3);
    }

    addDataNodes() {
        // Data nodes (spheres) with connecting lines
        this.dataNodesGroup = new THREE.Group();
        const nodeCount = 12;
        this.dataNodes = [];

        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2;
            const radius = 2.5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = (Math.random() - 0.5) * 1.5;

            // Create node sphere
            const geometry = new THREE.SphereGeometry(0.15, 16, 16);
            const material = new THREE.MeshStandardMaterial({
                color: 0x3B82F6,
                emissive: 0x60a5fa,
                emissiveIntensity: 1.5,
                metalness: 0.8,
                roughness: 0.2
            });
            const node = new THREE.Mesh(geometry, material);
            node.position.set(x, y, z);
            this.dataNodesGroup.add(node);
            this.dataNodes.push({ mesh: node, x, y, z });
        }

        // Create connecting lines
        for (let i = 0; i < this.dataNodes.length; i++) {
            const current = this.dataNodes[i];
            const next = this.dataNodes[(i + 1) % this.dataNodes.length];

            const points = [
                new THREE.Vector3(current.x, current.y, current.z),
                new THREE.Vector3(next.x, next.y, next.z)
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x3B82F6,
                opacity: 0.3,
                transparent: true
            });
            const line = new THREE.Line(geometry, material);
            this.dataNodesGroup.add(line);
        }

        this.techGroup.add(this.dataNodesGroup);
    }

    addDataParticles() {
        // Floating particles
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const radius = 3 + Math.random() * 1.5;

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            // Random colors (blue, purple, cyan)
            const colorChoice = Math.random();
            if (colorChoice < 0.33) {
                colors[i * 3] = 0.23; colors[i * 3 + 1] = 0.51; colors[i * 3 + 2] = 0.96; // Blue
            } else if (colorChoice < 0.66) {
                colors[i * 3] = 0.54; colors[i * 3 + 1] = 0.36; colors[i * 3 + 2] = 0.96; // Purple
            } else {
                colors[i * 3] = 0.06; colors[i * 3 + 1] = 0.72; colors[i * 3 + 2] = 0.88; // Cyan
            }
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.04,
            vertexColors: true,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        this.dataParticles = new THREE.Points(geometry, material);
        this.techGroup.add(this.dataParticles);
    }

    addFallbackScene() {
        // Simple rotating cube as fallback
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6 });
        this.fallbackCube = new THREE.Mesh(geometry, material);
        this.scene.add(this.fallbackCube);

        // Add basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(10, 10, 5);
        this.scene.add(directionalLight);
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        const deltaTime = this.clock.getDelta();
        const elapsedTime = this.clock.getElapsedTime();

        // Animate tech group (floating effect)
        this.techGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.3;
        this.techGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.2;
        this.techGroup.rotation.z = Math.sin(elapsedTime * 0.6) * 0.1;

        // Animate glow core
        if (this.glowCore) {
            this.glowCore.rotation.x += 0.001;
            this.glowCore.rotation.y += 0.002;
        }

        // Animate tech core
        if (this.techCore) {
            this.techCore.rotation.x += 0.002;
            this.techCore.rotation.y += 0.003;

            // Pulsing effect
            const scale = 1 + Math.sin(elapsedTime * 2) * 0.08;
            this.techCore.scale.setScalar(scale);
        }

        // Animate circuit rings
        if (this.ring1) this.ring1.rotation.z += 0.004;
        if (this.ring2) this.ring2.rotation.z -= 0.003;
        if (this.ring3) this.ring3.rotation.x += 0.002;

        // Animate data nodes
        if (this.dataNodesGroup) {
            this.dataNodesGroup.rotation.y += 0.003;
        }

        // Animate particles
        if (this.dataParticles) {
            this.dataParticles.rotation.y += 0.0003;
            this.dataParticles.rotation.x += 0.0002;
        }

        // Animate fallback cube if it exists
        if (this.fallbackCube) {
            this.fallbackCube.rotation.x += 0.01;
            this.fallbackCube.rotation.y += 0.01;
        }

        // Auto-rotate camera
        if (this.autoRotate) {
            this.camera.position.x = Math.cos(elapsedTime * 0.2) * 8;
            this.camera.position.z = Math.sin(elapsedTime * 0.2) * 8;
            this.camera.lookAt(0, 0, 0);
        }

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer && this.container) {
            this.container.removeChild(this.renderer.domElement);
        }
    }
}

// Initialize the 3D background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.abstract3D = new Abstract3D('threejs-background');
        console.log('3D background initialized successfully');
    } catch (error) {
        console.error('Failed to initialize 3D background:', error);
        // Fallback: set a gradient background
        document.getElementById('threejs-background').style.background = 'linear-gradient(45deg, #0a0a0a, #1a1a2e, #16213e)';
    }
});